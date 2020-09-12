'use strict'

const Route = use('Route')

module.exports = () => {
  Route.post('register', 'app/AuthController.register').validator('auth/Register').middleware('guest')
  Route.post('login', 'app/AuthController.login').validator('auth/Login').middleware('guest')
  Route.get('logout', 'app/AuthController.logout').middleware('auth')
}
