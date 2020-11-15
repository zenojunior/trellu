'use strict'

class SocketController {
  constructor({socket, request}) {
    this.socket = socket
    this.request = request
  }

  onMessage(message){
    console.log(this.socket.id, data)
    this.socket.broadcastToAll('message', message)
  }
}

module.exports = SocketController
