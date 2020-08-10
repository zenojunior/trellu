'use strict'
const Board = use('App/Models/Board')
const Database = use('Database')
class BoardController {

  async boards({response, auth}) {
    try {
      const user = await auth.getUser()
      const boards = await Database.table('boards').where('id', user.id)
      return response.status(200).json(boards)
    } catch (error) {
      return response.status(500).json({message: 'Erro na listagem de quadros.'})
    }
  }

  async create({request, response}) {
    try {
      const board = await Board.create(request.all())
      return response.status(200).json(board);
    } catch (error) {
      return response.status(500).json({message: 'Erro ao buscar criar o quadro.', error})
    }
  }

  async board({request, response}) {
    try {
      const board = await Database.table('boards').where('id', request.id)
      return response.status(200).json(board)
    } catch (error) {
      return response.status(500).json({message: 'Erro ao buscar o quadro.'})
    }
  }

  async delete({request, response}) {
    try {
      const board = await Database.table('boards').where('id', request.id).delete()
      return response.status(200).json(board)
    } catch (error) {
      return response.status(500).json({message: 'Erro ao buscar o quadro.'})
    }
  }


}

module.exports = BoardController
