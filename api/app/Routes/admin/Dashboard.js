'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/accounts-creation', 'admin/DashboardController.accountsCreation').middleware(['auth', 'adminAuth'])
  Route.get('/logins-logouts', 'admin/DashboardController.loginsLogouts').middleware(['auth', 'adminAuth'])
  Route.get('/boards-ordinations', 'admin/DashboardController.boardsOrdinations').middleware(['auth', 'adminAuth'])
}
