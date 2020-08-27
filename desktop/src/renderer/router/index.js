import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'auth-page',
      component: require('@/components/pages/AuthPage').default,
      meta: {
        guest: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard-page',
      component: require('@/components/pages/DashboardPage').default,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/board/:id',
      name: 'board-page',
      component: require('@/components/pages/BoardPage').default,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user',
      name: 'user-page',
      component: require('@/components/pages/UserPage').default,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user = localStorage.getItem('user')
    if (!user || user === 'null') next({path: '/', params: { nextUrl: to.fullPath }})
    else next()
  } else if (to.matched.some(record => record.meta.guest)) {
    let user = localStorage.getItem('user')
    if (!user || user === 'null') next()
    else next({name: 'dashboard-page'})
  } else {
    next()
  }
})

export default router
