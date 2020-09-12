'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'admin/GroupController.js.users').middleware('auth')
  Route.put('/', 'admin/GroupController.js.update').middleware('auth')
  Route.delete('/:id', 'admin/GroupController.js.delete').middleware('auth')
}
