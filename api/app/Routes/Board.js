'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('boards', 'BoardController.boards').middleware('auth')
  Route.get('board:id', 'BoardController.board').middleware('auth')
  Route.delete('delete:id', 'BoardController.delete').middleware('auth')

}
