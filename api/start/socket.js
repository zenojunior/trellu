const server = use('Server')
const io = use('socket.io')(server.getInstance())
const SocketController = use('App/Controllers/Http/SocketController')
io.on('connection', function (socket) {
  SocketController.onMessage(socket, io)
})
