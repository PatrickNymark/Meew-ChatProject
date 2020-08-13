const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const server = require("http").Server(app);
const io = require('socket.io')(server)

require('dotenv').config();



mongoose.connect('mongodb://localhost:27017/meew-chat', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('db connected'));


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/api/auth', require('./controllers/auth.controller'));
app.use('/api/users', require('./controllers/user.controller'));


const port = process.env.PORT || 5000;

app.use(require('./helpers/error-handler'))

// require socketio listeners
// require('./services/socket.service')(io)

const Room = require('./models/Room');
const Message = require('./models/Message');


io.on('connection', socket => {
    console.log('Server: Connected')

    socket.on('open-room', async ({ userId, loggedUser }) => {
        // const roomId = userId + loggedUser;
        const foundRoom = await Room.find({ participants: { $eq: [userId, loggedUser]}});
        const foundRoom2 = await Room.find({ participants: { $eq: [loggedUser, userId]}});
        console.log(foundRoom.length)
        console.log(foundRoom2.length)

        if(foundRoom.length == 1 || foundRoom2.length == 1) {
            console.log('Server: Found Room')
            let roomId = 0;

            if(foundRoom.length == 1) {
                roomId = foundRoom[0]._id
            } else  {
                roomId = foundRoom2[0]._id
            }

            socket.join(roomId);
            socket.emit('room', roomId)

            const messages = await Message.find().where({ roomId }).populate('owner')
            io.sockets.in(roomId).emit('messages', messages)
            
        } else {
            console.log('Server: New Room')

            const participants = [userId, loggedUser]
            const newRoom = new Room({ participants });
            await newRoom.save();

            socket.join(newRoom._id);
            
            socket.emit('room', newRoom._id);
        }
    });

    socket.on('new-message', async ({ message, room, owner }) => {
        const newMessage = new Message({ message, roomId: room, owner })
        const savedMessage = await newMessage.save().then(m => m.populate('owner').execPopulate());

        io.sockets.in(room).emit('message', savedMessage)
    })
})


server.listen(port, () => console.log(`Server running on ${port}`))