'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'admin/UserController.users').middleware(['auth', 'adminAuth'])
  Route.post('/', 'admin/UserController.create').middleware(['auth', 'adminAuth'])
  Route.put('/:id', 'admin/UserController.update').middleware(['auth', 'adminAuth'])
  Route.delete('/:id', 'admin/UserController.delete').middleware(['auth', 'adminAuth'])
}
