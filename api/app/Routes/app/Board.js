'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('/', 'app/BoardController.boards').middleware('auth')
  Route.post('/', 'app/BoardController.create').validator('boards/Create').middleware('auth')
  Route.get('/:id', 'app/BoardController.board').middleware('auth')
  Route.put('/:id', 'app/BoardController.update').middleware('auth')
  Route.delete('/:id', 'app/BoardController.delete').middleware('auth')
  Route.post('/:id/ordenate', 'app/BoardController.ordenate').middleware('auth')
}
