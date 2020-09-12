'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'app/UserController.user').middleware('auth')
  Route.put('/', 'app/UserController.update').middleware('auth')
  Route.put('/password/', 'app/UserController.updatePassword').validator('users/UpdatePassword').middleware('auth')
  Route.delete('/:id', 'app/UserController.delete').middleware('auth')
}
