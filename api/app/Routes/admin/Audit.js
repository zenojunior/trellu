'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'admin/AuditController.audits').middleware('auth')
  Route.get('/:id', 'admin/AuditController.audit').middleware('auth')
  Route.delete('/:id', 'admin/AuditController.delete').middleware('auth')
}
