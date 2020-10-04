'use strict'
const List = use('App/Models/List')
const Board = use('App/Models/Board')
const Card = use('App/Models/Card')
const Database = use('Database')
const logger = use('App/Helpers/Logger')
const auditor = use('App/Helpers/Auditor')

class ListController {


  async cards({response, params, auth}) {
    try {
      const cards = await Database.table('cards').where('list_id', params.id)
      const list = await List.find(params.id)
      const board = await Board.find(list.board_id)
      if (await this.authorized(auth, board.id)) {
        return response.status(200).json(cards)
      } else {
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      return response.status(500).json({message: 'Erro na listagem de cartões.', error})
    }
  }

  async create({request, auth, response}) {
    try {
      if (await this.authorized(auth, request.input('board_id'))) {
        const list = await List.create(request.all())
        return response.status(200).json(list);
      } else {
        await logger('warning', 'Usuário não autorizado', auth)
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      await logger('error', 'Erro ao criar a lista', auth, error)
      return response.status(500).json({message: 'Erro ao criar a lista', error})
    }
  }

  async update({params, response, auth, request}) {
    try {
      let list = await List.find(params.id)
      if (await this.authorized(auth, list.board_id)) {
        const {title, color, archived, featured} = request.all()
        list.title = title
        list.color = color
        list.archived = archived
        list.featured = featured
        await list.save()
        if(archived) await auditor('Lists archived', list.id, 'boards', request.headers()['user-agent'], auth)
        return response.status(200).json(list);
      } else {
        await logger('warning', 'Usuário não autorizado', auth)
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      await logger('error', 'Erro ao atualizar a lista', auth, error)
      return response.status(500).json({message: 'Erro ao atualizar a lista.', error})
    }
  }

  async list({response, auth, params}) {
    try {
      const list = await List.find(params.id)
      if (await this.authorized(auth, list.board_id)) {
        return response.status(200).json(list)
      } else {
        await logger('warning', 'Usuário não autorizado', auth)
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      await logger('error', 'Erro ao buscar a lista', auth, error)
      return response.status(500).json({message: 'Erro ao buscar a lista.'})
    }
  }


  async delete({params, auth, response, request}) {
    const transition = await Database.beginTransaction()
    try {
      const list = await List.find(params.id)
      if (await this.authorized(auth, list.board_id)) {
        await Card.query().where('list_id', params.id).delete()
        await auditor('List deleted', list.id, 'lists', request.headers()['user-agent'], auth)
        await list.delete()
        await transition.commit()
        return response.status(200).json({message: 'Lista removida com sucesso.'})
      } else {
        await logger('warning', 'Usuário não autorizado', auth)
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      await transition.rollback()
      await logger('error', 'Erro ao excluir o cartão', auth, error)
      return response.status(500).json({message: 'Erro ao excluir o cartão.', error})
    }
  }

  async authorized(auth, board) {
    const user = await auth.getUser()
    board = await Database.table('boards').where('id', board).where('user_id', user.id)
    return (board.length !== 0)
  }

}

module.exports = ListController
