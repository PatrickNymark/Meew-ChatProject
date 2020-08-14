const Room = require('../models/Room');
const Message = require('../models/Message');
const User = require('../models/User')

module.exports = function(io) {
    io.on('connection', socket => {
        console.log('Server: Connected')

        socket.on('open-room', async ({ userId, loggedUser }) => {
            // const roomId = userId + loggedUser;
            const foundRoom = await Room.find({ participants: { $eq: [userId, loggedUser]}});
            const foundRoom2 = await Room.find({ participants: { $eq: [loggedUser, userId]}});
            const chatUser = await User.findById(userId);

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
                socket.emit('room', { roomId, chatUser })

                const messages = await Message.find().where({ roomId }).populate('owner')
                io.sockets.in(roomId).emit('messages', messages)
                
            } else {
                console.log('Server: New Room')

                const participants = [userId, loggedUser]
                const newRoom = new Room({ participants });
                await newRoom.save();

                const roomId = newRoom._id;

                socket.join(roomId);
                
                socket.emit('room', { roomId, chatUser });
            }
        });

        socket.on('new-message', async ({ message, room, owner }) => {
            const newMessage = new Message({ message, roomId: room, owner })
            const savedMessage = await newMessage.save().then(m => m.populate('owner').execPopulate());

            io.sockets.in(room).emit('message', savedMessage)
        })

        socket.on('typing', ({ username, room }) => {
            io.sockets.in(room).emit('isTyping', username)
        })

        socket.on('stoppedTyping', (room) => {
            io.sockets.in(room).emit('isTyping')
        })
    })
}
 