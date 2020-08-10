'use strict'

const Route = use('Route')

module.exports = () => {
  Route.get('boards', 'BoardController.boards').middleware('auth')
  Route.get('board:id', 'BoardController.board').middleware('auth')
  Route.delete('board:id', 'BoardController.delete').middleware('auth')

}
