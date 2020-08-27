'use strict'
const Card = use('App/Models/Card')
const List = use('App/Models/List')
const Database = use('Database')
const logger = use('App/Helpers/Logger')

class CardController {

  async create({request, auth, response}) {
    try {
      if (await this.authorized(auth, request.input('list_id'))) {
        const card = await Card.create(request.all())
        return response.status(200).json(card);
      } else {
        await logger('warning', 'Usuário não autorizado', auth)
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      await logger('error', 'Erro ao criar o cartão', auth, error)
      return response.status(500).json({message: 'Erro ao criar o cartão', error})
    }
  }

  async update({ params, response, auth, request }) {
    try {
      let card = await Card.find(params.id)
      if (await this.authorized(auth, card.list_id)) {
        if (request.input('title')) card.title = request.input('title')
        if (request.input('description')) card.description = request.input('description')
        if (request.input('archived')) card.color = request.input('archived')
        if (request.input('date')) card.date = await this.formatDate(request.input('date'))
        await card.save()
        return response.status(200).json(card);
      } else {
        await logger('warning', 'Usuário não autorizado', auth)
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      await logger('error', 'Erro ao atualizar o cartão', auth, error)
      return response.status(500).json({message: 'Erro ao atualizar o cartão.', error})
    }
  }

  async card({ response, auth, params }) {
    try {
      const card = await Database.table('cards').where('id', params.id).first()
      if (await this.authorized(auth, card.list_id)) {
        return response.status(200).json(card)
      } else {
        await logger('warning', 'Usuário não autorizado', auth)
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      await logger('error', 'Erro ao buscar o cartão', auth, error)
      return response.status(500).json({message: 'Erro ao buscar o cartão.'})
    }
  }

  async delete({ params, auth, response }) {
    try {
      let card = await Card.find(params.id)
      if (await this.authorized(auth, card.list_id)) {
        await card.delete()
        return response.status(200).json({message: 'Cartão removido com sucesso.'})
      } else {
        await logger('warning', 'Usuário não autorizado', auth)
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      await logger('error', 'Erro ao excluir o cartão', auth, error)
      return response.status(500).json({message: 'Erro ao excluir o cartão.', error})
    }
  }

  async authorized(auth, list) {
    const user = await auth.getUser()
    list = await List.find(list)
    const board = await Database.table('boards').where('id', list.board_id).where('user_id', user.id)
    return (board.length !== 0)
  }

  async formatDate(dateTime) {
    dateTime = dateTime.split(" ")
    let data = dateTime[0].split("/")
    data = [data[2], data[1], data[0]].join('-')
    return [data, dateTime[1]].join(' ')
  }
}

module.exports = CardController;
