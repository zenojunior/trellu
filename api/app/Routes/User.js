'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'UserController.user').middleware('auth')
  Route.put('/', 'UserController.update').validator('users/Update').middleware('auth')
  Route.put('/password/', 'UserController.updatePassword').validator('users/UpdatePassword').middleware('auth')
  Route.delete('/:id', 'UserController.delete').middleware('auth')
}
