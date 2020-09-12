'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'admin/GroupController.groups').middleware('auth')
  Route.post('/', 'admin/GroupController.create').middleware('auth')
  Route.put('/:id', 'admin/GroupController.update').middleware('auth')
  Route.delete('/:id', 'admin/GroupController.delete').middleware('auth')
}
