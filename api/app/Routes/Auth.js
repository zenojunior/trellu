'use strict'

const Route = use('Route')

module.exports = () => {
  // Route.post('authorise', 'AuthController.authorise').validator('auth/Authorise')
  Route.post('register', 'AuthController.register').validator('auth/Register').middleware('guest')
  Route.post('login', 'AuthController.login').validator('auth/Login').middleware('guest')
  Route.get('logout', 'AuthController.logout').middleware('auth')
  // Route.post('forgot/password', 'AuthController.forgotPassword').validator('auth/ForgotPassword')
  // Route.post('reset/password', 'AuthController.resetPassword').validator('auth/ResetPassword').as('auth.reset.password')
  // Route.get('me', 'AuthController.me').middleware('jwtAuth')
}
