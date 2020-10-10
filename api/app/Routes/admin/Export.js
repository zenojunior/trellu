'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'admin/AuditController.export').middleware(['auth', 'adminAuth'])
}
