import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import store from './store'

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('https://trellu-websocket.herokuapp.com'),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))
