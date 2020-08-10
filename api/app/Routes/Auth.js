'use strict'

const Route = use('Route')

module.exports = () => {
  Route.post('register', 'AuthController.register').validator('auth/Register').middleware('guest')
  Route.post('login', 'AuthController.login').validator('auth/Login').middleware('guest')
  Route.get('logout', 'AuthController.logout').middleware('auth')
}
