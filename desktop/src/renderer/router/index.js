import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'auth-page',
      component: require('@/components/AuthPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
