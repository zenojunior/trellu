'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'BoardController.boards').middleware('auth')
  Route.post('/', 'BoardController.create').validator('boards/Create').middleware('auth')
  Route.get('/:id', 'BoardController.board').middleware('auth')
  Route.put('/:id', 'BoardController.update').middleware('auth')
  Route.delete('/:id', 'BoardController.delete').middleware('auth')
}
