'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/:id/cards', 'app/ListController.cards').middleware('auth')
  Route.post('/', 'app/ListController.create').validator('lists/Create').middleware('auth')
  Route.get('/:id', 'app/ListController.list').middleware('auth')
  Route.put('/:id', 'app/ListController.update').middleware('auth')
  Route.delete('/:id', 'app/ListController.delete').middleware('auth')
}
