'use strict'

class SocketController {
  constructor({socket, request}) {
    this.socket = socket
    this.request = request
  }

  onMessage(socket, io){
    io.on('connection', function(socket){
      console.log('a user connected');
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    });
  }
}

module.exports = SocketController
