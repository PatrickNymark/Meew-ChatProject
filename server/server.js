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
require('./services/socket.service')(io)


server.listen(port, () => console.log(`Server running on ${port}`))