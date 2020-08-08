'use strict'

const Route = use('Route')

module.exports = () => {
  Route.post('authorise', 'AuthController.authorise').validator('auth/Authorise')
  Route.post('signup', 'AuthController.signup').validator('auth/Signup')
  Route.post('login', 'AuthController.login').validator('auth/Login')
  Route.get('logout', 'AuthController.logout')
  // Route.post('forgot/password', 'AuthController.forgotPassword').validator('auth/ForgotPassword')
  // Route.post('reset/password', 'AuthController.resetPassword').validator('auth/ResetPassword').as('auth.reset.password')
  // Route.get('me', 'AuthController.me').middleware('jwtAuth')
}
