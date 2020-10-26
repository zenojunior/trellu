'use strict'

const Route = use('Route')

module.exports = () => {
  Route.post('/accounts-creation', 'admin/DashboardController.accountsCreation').middleware(['auth', 'adminAuth'])
  Route.post('/logins-logouts', 'admin/DashboardController.loginsLogouts').middleware(['auth', 'adminAuth'])
  Route.post('/boards-ordinations', 'admin/DashboardController.boardsOrdinations').middleware(['auth', 'adminAuth'])
  Route.post('/words-cloud', 'admin/DashboardController.wordsCloud').middleware(['auth', 'adminAuth'])
  Route.post('/send-email', 'admin/DashboardController.sendEmail').middleware(['auth', 'adminAuth'])
}
