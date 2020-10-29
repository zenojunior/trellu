'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'admin/LogController.logs').middleware(['auth', 'adminAuth'])
  Route.get('/:id', 'admin/LogController.log').middleware(['auth', 'adminAuth'])
  Route.delete('/:id', 'admin/LogController.delete').middleware(['auth', 'adminAuth'])
}
