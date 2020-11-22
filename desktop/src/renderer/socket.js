import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import store from './store'

const connection = SocketIO('https://trellu-websocket.herokuapp.com')

Vue.use(new VueSocketIO({
  debug: false,
  connection,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))
