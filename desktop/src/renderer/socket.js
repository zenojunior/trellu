import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import store from './store'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3333',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))
