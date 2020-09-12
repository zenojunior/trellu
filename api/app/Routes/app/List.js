'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/:id/cards', 'ListController.cards').middleware('auth')
  Route.post('/', 'ListController.create').validator('lists/Create').middleware('auth')
  Route.get('/:id', 'ListController.list').middleware('auth')
  Route.put('/:id', 'ListController.update').middleware('auth')
  Route.delete('/:id', 'ListController.delete').middleware('auth')
}
