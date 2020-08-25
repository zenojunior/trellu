'use strict'
const Board = use('App/Models/Board')
const Database = use('Database')
const logger = use('App/Helpers/Logger')

class BoardController {

  async boards({response, auth}) {
    try {
      const user = await auth.getUser()
      const boards = await Board.query().where('user_id', user.id).with('lists', (builder) => {
        builder.orderBy('lists.order').where('lists.archived', 0).with('cards', (builder) => {
          builder.where('cards.archived', 0)
        })
      }).fetch()
      return response.status(200).json(boards)
    } catch (error) {
      await logger('error','Erro na listagem de quadros', auth, error)
      return response.status(500).json({message: 'Erro na listagem de quadros', error})
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
      await logger('error','Erro ao criar o quadro', auth, error)
      return response.status(500).json({message: 'Erro ao criar o quadro', error})
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
      await logger('error','Erro ao atualizar o quadro', auth, error)
      return response.status(500).json({message: 'Erro ao atualizar o quadro', error})
    }
  }

  async board({response, auth, params}) {
    try {
      const board = await Board.query().where('id', params.id).with('lists', (builder) => {
        builder.orderBy('lists.order').where('lists.archived', 0).with('cards', (builder) => {
          builder.where('cards.archived', 0)
        })
      }).first()
      return response.status(200).json(board)
    } catch (error) {
      await logger('error','Erro ao buscar o quadro', auth, error)
      return response.status(500).json({message: 'Erro ao buscar o quadro', error})
    }
  }

  async delete({params, auth, response}) {
    try {
      let board = await Board.find(params.id)
      await board.delete()
      return response.status(200).json({message: 'Qauadro removido com sucesso.'})
    } catch (error) {
      await logger('error','Erro ao excluir o quadro', auth, error)
      return response.status(500).json({message: 'Erro ao excluir o quadro.', error})
    }
  }


}

module.exports = BoardController
