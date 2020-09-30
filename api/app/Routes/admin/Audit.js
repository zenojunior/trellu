'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'admin/AuditController.audits').middleware(['auth', 'adminAuth'])
  Route.get('/export', 'admin/AuditController.export').middleware(['auth', 'adminAuth'])
  Route.get('/:id', 'admin/AuditController.audit').middleware(['auth', 'adminAuth'])
  Route.delete('/:id', 'admin/AuditController.delete').middleware(['auth', 'adminAuth'])
}
