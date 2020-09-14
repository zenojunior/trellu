'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'admin/LogController.logs').middleware('auth')
  Route.get('/:id', 'admin/LogController.log').middleware('auth')
  Route.delete('/:id', 'admin/LogController.delete').middleware('auth')
}
