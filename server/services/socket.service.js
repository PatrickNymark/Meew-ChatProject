const Room = require('../models/Room');


module.exports = function(socket) {
    socket.on('connection', function (socket) {
    
        // socket.on('request-game', (gameId, initial) => {
        //     gameService.findById(gameId).then(game => {
        //         if(initial) {
        //             socket.emit('initial-game', game)
        //         } else {
        //             socket.emit('updated-game', game)
        //         }
        //     })
        // })    
    })
};