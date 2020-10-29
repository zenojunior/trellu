'use strict'

const Route = use('Route')

module.exports = () => {
  Route.post('/', 'app/CardController.create').validator('cards/Create').middleware('auth')
  Route.get('/:id', 'app/CardController.card').middleware('auth')
  Route.put('/:id', 'app/CardController.update').middleware('auth')
  Route.delete('/:id', 'app/CardController.delete').middleware('auth')
}
