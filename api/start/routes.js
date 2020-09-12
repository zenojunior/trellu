'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { Trellu: 'Is cooming', Download: 'https://trellu-download.herokuapp.com' }
})
Route.group(use('App/Routes/app/Auth')).prefix('api/auth')
Route.group(use('App/Routes/app/User')).prefix('api/user')
Route.group(use('App/Routes/app/Board')).prefix('api/boards')
Route.group(use('App/Routes/app/List')).prefix('api/lists')
Route.group(use('App/Routes/app/Card')).prefix('api/cards')

Route.group(use('App/Routes/admin/User')).prefix('api/admin/users')
Route.group(use('App/Routes/admin/Group')).prefix('api/admin/groups')

// Route.get('login/facebook', 'UserController.redirect')
// Route.get('facebook/callback', 'UserController.callback')

