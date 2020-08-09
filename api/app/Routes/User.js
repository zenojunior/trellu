'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('me', 'UserController.me').middleware('auth')
}
