'use strict'

const Route = use('Route')

module.exports = () => {
  Route.post('/accounts-creation', 'admin/DashboardController.accountsCreation').middleware(['auth', 'adminAuth'])
  Route.post('/logins-logouts', 'admin/DashboardController.loginsLogouts').middleware(['auth', 'adminAuth'])
  Route.post('/boards-ordinations', 'admin/DashboardController.boardsOrdinations').middleware(['auth', 'adminAuth'])
}
