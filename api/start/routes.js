'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { Trellu: 'Is cooming' }
})
Route.group(use('App/Routes/Auth')).prefix('api/auth')
Route.get('login/facebook', 'UserController.redirect')
Route.get('facebook/callback', 'UserController.callback')

