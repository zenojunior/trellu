'use strict'
const Board = use('App/Models/Board')
const Database = use('Database')
class BoardController {

  async boards({response, auth}) {
    try {
      const user = await auth.getUser()
      const boards = await Database.table('boards').where('user_id', user.id)
      return response.status(200).json(boards)
    } catch (error) {
      return response.status(500).json({message: 'Erro na listagem de quadros.', error})
    }
  }

  async create({request, response, auth}) {
    try {
      const user = await auth.getUser()
      let data = request.all()
      data.user_id = user.id
      const board = await Board.create(data)
      return response.status(200).json(board);
    } catch (error) {
      return response.status(500).json({message: 'Erro ao criar o quadro.', error})
    }
  }

  async update({params, response, auth, request}) {
    try {
    let board = await Board.find(params.id)
      if (request.input('title'))  board.title = request.input('title')
      if (request.input('color'))  board.color = request.input('color')
      if (request.input('featured'))  board.featured = request.input('featured')
      if (request.input('structure'))  board.structure = request.input('structure')
      await board.save()
      return response.status(200).json(board);
    } catch (error) {
      return response.status(500).json({message: 'Erro ao atualizar o quadro.', error})
    }
  }

  async board({response, params}) {
    try {
      const board = await Database.table('boards').where('id', params.id).first()
      return response.status(200).json(board)
    } catch (error) {
      return response.status(500).json({message: 'Erro ao buscar o quadro.'})
    }
  }

  async delete({params, response}) {
    try {
      let board = await Board.find(params.id)
      await board.delete()
      return response.status(200).json({message: 'Qauadro removido com sucesso.'})
    } catch (error) {
      return response.status(500).json({message: 'Erro ao excluir o quadro.', error})
    }
  }


}

module.exports = BoardController
