const server = use('Server')
const io = use('socket.io')(server.getInstance())
const SocketController = use('App/Controllers/Ws/SocketController')
io.on('connection', function (socket) {
  SocketController.onMessage(socket)
  
  console.log('user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
})
