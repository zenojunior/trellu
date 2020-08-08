import Vue from 'vue'
import axios from 'axios'
import Buefy from 'buefy'

import App from './App'
import router from './router'
import store from './store'

import state from './global'
Vue.prototype.$global = state

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
const api = axios.create({ baseURL: 'https://trellu-app.herokuapp.com' })
Vue.api = Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.use(Buefy, {
  defaultIconPack: 'mdi'
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')