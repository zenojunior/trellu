'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { Trellu: 'Is cooming', Download: 'https://trellu-download.herokuapp.com' }
})
Route.group(use('App/Routes/Auth')).prefix('api/auth')
Route.group(use('App/Routes/User')).prefix('api/user')
Route.group(use('App/Routes/Board')).prefix('api/boards')
Route.group(use('App/Routes/List')).prefix('api/lists')
Route.group(use('App/Routes/Card')).prefix('api/cards')
Route.get('login/facebook', 'UserController.redirect')
Route.get('facebook/callback', 'UserController.callback')

