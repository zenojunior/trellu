'use strict'

class SocketController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = SocketController
