'use strict'

class SocketController {
  constructor({socket, request}) {
    this.socket = socket
    this.request = request
  }

  onMessage(data){
    console.log(this.socket.id, data)
  }
}

module.exports = SocketController
