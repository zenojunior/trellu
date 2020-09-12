'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'site/UserController.users').middleware('auth')
  Route.put('/:id', 'site/UserController.update').middleware('auth')
  Route.delete('/:id', 'site/UserController.delete').middleware('auth')
}
