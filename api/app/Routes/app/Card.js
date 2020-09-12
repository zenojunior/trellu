'use strict'

const Route = use('Route')

module.exports = () => {
  Route.post('/', 'CardController.create').validator('cards/Create').middleware('auth')
  Route.get('/:id', 'CardController.card').middleware('auth')
  Route.put('/:id', 'CardController.update').middleware('auth')
  Route.delete('/:id', 'CardController.delete').middleware('auth')
}
