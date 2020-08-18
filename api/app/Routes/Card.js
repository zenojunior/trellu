'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/board/:board_id', 'CardController.cards').middleware('auth')
  Route.post('/', 'CardController.create').validator('cards/Create').middleware('auth')
  Route.get('/:id', 'CardController.card').middleware('auth')
  Route.put('/:id', 'CardController.update').middleware('auth')
  Route.delete('/:id', 'CardController.delete').middleware('auth')
}
