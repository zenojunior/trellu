'use strict'
const Card = use('App/Models/Card')
const Database = use('Database')

class CardController {

  async cards({response, params, auth}) {
    try {
      const cards = await Database.table('cards').where('board_id', params.bord_id)
      if (await this.authorized(auth, card.board_id)) {
        return response.status(200).json(cards)
      }else{
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      return response.status(500).json({message: 'Erro na listagem de cartões.', error})
    }
  }

  async create({request, auth, response}) {
    try {
      if (await this.authorized(auth, request.input('board_id'))) {
        const card = await Card.create(request.all())
        return response.status(200).json(card);
      } else {
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      return response.status(500).json({message: 'Erro ao criar o cartão.', error})
    }
  }

  async update({params, response, auth, request}) {
    try {
      let card = await Card.find(params.id)
      if (await this.authorized(auth, card.board_id)) {
        if (request.input('title')) card.title = request.input('title')
        if (request.input('description')) card.color = request.input('description')
        await card.save()
        return response.status(200).json(card);
      } else {
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      return response.status(500).json({message: 'Erro ao atualizar o cartão.', error})
    }
  }

  async card({response, auth, params}) {
    try {
      const card = await Database.table('cards').where('id', params.id).first()
      if ( await this.authorized(auth, card.board_id)) {
        return response.status(200).json(card)
      }else{
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      return response.status(500).json({message: 'Erro ao buscar o cartão.'})
    }
  }

  async delete({params, auth, response}) {
    try {
      let card = await Card.find(params.id)
      if (await this.authorized(auth, card.board_id)) {
        await card.delete()
        return response.status(200).json({message: 'Cartão removido com sucesso.'})
      } else {
        return response.status(401).json({message: 'Usuário não autorizado.'});
      }
    } catch (error) {
      return response.status(500).json({message: 'Erro ao excluir o cartão.', error})
    }
  }

  async authorized(auth, board) {
    const user = await auth.getUser()
    board = await Database.table('boards').where('id', board).where('user_id', user.id)
    return (board.length !== 0)
  }

}

module.exports = CardController
