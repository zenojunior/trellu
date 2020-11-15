'use strict'

class SocketController {
  constructor({socket, request}) {
    this.socket = socket
    this.request = request
  }

<<<<<<< HEAD
  onMessage(socket, io){
    io.on('connection', function(socket){
      console.log('a user connected');
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    });
=======
  onMessage(message){
    console.log(this.socket.id, data)
    this.socket.broadcastToAll('message', message)
>>>>>>> b7581399b3927ee29e6a63e00cea65211b2459ee
  }
}

module.exports = SocketController
