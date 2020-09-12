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
      path: '/admin',
      name: 'admin',
      component: require('@/components/pages/admin/AdminPage').default,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin-users',
      name: 'admin-users',
      component: require('@/components/pages/admin/AdminUsersPage').default,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin-groups',
      name: 'admin-groups',
      component: require('@/components/pages/admin/AdminGroupsPage').default,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin-audity',
      name: 'admin-audity',
      component: require('@/components/pages/admin/AdminAudityPage').default,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin-logs',
      name: 'admin-logs',
      component: require('@/components/pages/admin/AdminLogsPage').default,
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
