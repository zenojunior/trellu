'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('edit', 'UserController.edit').middleware('auth')
  Route.put('update', 'UserController.update').middleware('auth')
  Route.delete('delete', 'UserController.delete').middleware('auth')
}
