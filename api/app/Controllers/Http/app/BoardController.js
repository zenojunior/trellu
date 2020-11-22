'use strict'
const Board = use('App/Models/Board')
const List = use('App/Models/List')
const Card = use('App/Models/Card')
const Database = use('Database')
const logger = use('App/Helpers/Logger')
const axios = require('axios');
const auditor = use('App/Helpers/Auditor')
const Config = use('Config')

class BoardController {

  async boards({response, auth}) {
    try {
      const user = await auth.getUser()
      const boards = await Board.query().where('user_id', user.id).with('lists', (builder) => {
        builder.orderBy('lists.order').where('lists.archived', 0).with('cards', (builder) => {
          builder.where('cards.archived', 0).orderBy('cards.order')
        })
      }).fetch()
      return response.status(200).json(boards)
    } catch (error) {
      await logger('error', 'Erro na listagem de quadros', auth, error)
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
      await logger('error', 'Erro ao criar o quadro', auth, error)
      return response.status(500).json({message: 'Erro ao criar o quadro', error})
    }
  }

  async update({params, response, auth, request}) {
    try {
      let board = await Board.find(params.id)
      const {title, color, archived, featured} = request.all()
      board.title = title
      board.color = color
      board.archived = archived
      board.featured = featured
      if (archived) await auditor('Board archived', board.id, 'boards', request.headers()['user-agent'], auth)
      await board.save()
      return response.status(200).json(board)
    } catch (error) {
      await logger('error', 'Erro ao atualizar o quadro', auth, error)
      return response.status(500).json({message: 'Erro ao atualizar o quadro', error})
    }
  }

  async board({response, auth, params}) {
    try {
      const board = await Board.query().where('id', params.id).with('lists', (builder) => {
        builder.orderBy('lists.order').where('lists.archived', 0).with('cards', (builder) => {
          builder.where('cards.archived', 0).orderBy('cards.order')
        })
      }).first()
      return response.status(200).json(board)
    } catch (error) {
      await logger('error', 'Erro ao buscar o quadro', auth, error)
      return response.status(500).json({message: 'Erro ao buscar o quadro', error})
    }
  }

  async delete({params, auth, response, request}) {
    const transition = await Database.beginTransaction()
    try {
      let board = await Board.find(params.id)
      const lists = await Database.table('lists').where('board_id', params.id)
      for (let list of lists) {
        await Database.table('cards').where('list_id', list.id).delete()
        await Database.table('lists').where('id', list.id).delete()
      }
      await auditor('Delete', board.id, 'boards', request.headers()['user-agent'], auth)
      await board.delete()
      await transition.commit()
      return response.status(200).json({message: 'Quadro removido com sucesso.'})
    } catch (error) {
      await transition.rollback()
      await logger('error', 'Erro ao excluir o quadro', auth, error)
      return response.status(500).json({message: 'Erro ao excluir o quadro.', error})
    }
  }

  async ordenate({request, auth, response}) {
    const transition = await Database.beginTransaction()
    // const websocketUrl = Config.get('socket.externalUrl')
    const websocketUrl = 'http://localhost:3000'
    const socketId = request.input('socketId')

    let boardId = null
    try {
      const structure = request.input('lists')
      for (let [listIndex, listValue] of structure.entries()) {
        let list = await List.find(listValue.id)
        boardId = list.board_id
        list.order = listIndex + 1
        list.save();
        for (let [cardIndex, cardValue] of listValue.cards.entries()) {
          let card = await Card.find(cardValue)
          card.order = cardIndex + 1
          card.list_id = list.id
          card.save()
        }
      }
      axios.post(`${websocketUrl}/webhooks/ordenate`,{ structure, boardId, socketId })
        .catch(() => response.status(500).json({message: 'Erro ao atualizar ordenação das listas e cartões.'}));

      await transition.commit()
      await auditor('Board ordination', null, 'boards', request.headers()['user-agent'], auth)
      return response.status(200).json({message: 'Quadro ordenado com sucesso.'})
    } catch (error) {
      await transition.rollback()
      await logger('error', 'Erro ao atualizar ordenação das listas e cartões', auth, error)
      return response.status(500).json({message: 'Erro ao atualizar ordenação das listas e cartões.'})

    }
  }


}

module.exports = BoardController
