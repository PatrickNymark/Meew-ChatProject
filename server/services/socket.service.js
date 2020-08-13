const Room = require('../models/Room');
const Message = require('../models/Message');
 
// module.exports = function(socket) {
//     socket.on('connection', function (socket) {
        
//         socket.on('open-room', async ({ userId, loggedUser }) => {

//             const roomId = userId + loggedUser;

//             const foundRoom = await Room.findOne({ roomId });

//             if(foundRoom) {
//                 console.log('Server: Found Room')

//                 socket.join(foundRoom.roomId);

//                 // socket.emit('test', 'tese')
//                 // const messages = await Message.find().where({ roomId });

//                 socket.to(foundRoom.roomId).emit('messages', ['tesst', 'test2', 'test3'])
                
//             } else {
//                 console.log('Server: New Room')

//                 const participants = [userId, loggedUser]
//                 const newRoom = new Room({ roomId, participants });
//                 await newRoom.save();

//                 socket.join(roomId);
                
//                 socket.emit('room', roomId);
//             }
//         });

//         socket.on('new-message', async ({ message, room, owner }) => {
//             const newMessage = new Message({ message, roomId: room, owner })
//             await newMessage.save();

//             // socket.emit('message', newMessage)

//             socket.to(room).emit('message', message)
//         })
//     })
// };