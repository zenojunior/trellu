'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'admin/UserController.users').middleware('auth')
  Route.post('/', 'admin/UserController.create').middleware('auth')
  Route.put('/:id', 'admin/UserController.update').middleware('auth')
  Route.delete('/:id', 'admin/UserController.delete').middleware('auth')
}
