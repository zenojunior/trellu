'use strict'

class SocketController {
  constructor({socket, request}) {
    this.socket = socket
    this.request = request
  }

  static onMessage(socket){
    socket.on('message', function(data){
      console.log(data);
    });
  }
}

module.exports = SocketController
