'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'admin/GroupController.groups').middleware(['auth', 'adminAuth'])
  Route.get('/:id', 'admin/GroupController.group').middleware(['auth', 'adminAuth'])
  Route.post('/', 'admin/GroupController.create').middleware(['auth', 'adminAuth'])
  Route.put('/:id', 'admin/GroupController.update').middleware(['auth', 'adminAuth'])
  Route.delete('/:id', 'admin/GroupController.delete').middleware(['auth', 'adminAuth'])
}
