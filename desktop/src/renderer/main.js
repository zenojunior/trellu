import Vue from 'vue'
import axios from 'axios'
import Buefy from 'buefy'
import VueMoment from 'vue-moment'
import VueCookie from 'vue-cookie'
import moment from 'moment-timezone'
import './socket'

import App from './App'
import router from './router'
import store from './store'

import state from './global'
Vue.prototype.$global = state

const url = {
  development: 'http://localhost:3333',
  production: 'https://trellu-app.herokuapp.com'
}

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
const api = axios.create({ baseURL: url[process.env.NODE_ENV] })
api.interceptors.response.use(
  response => response,
  error => {
    // console.log(error.response.data.error.message)
    if (error.response.status === 401) {
      localStorage.clear()
      router.replace({path: '/'})
    } else {
      return Promise.reject(error.response.data)
    }
  }
)
Vue.api = Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.use(VueMoment, {
  moment
})
Vue.use(VueCookie)
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
