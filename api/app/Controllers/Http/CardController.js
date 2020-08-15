'use strict'
const Card = use('App/Models/Card')
const Database = use('Database')
class CardController {

  async cards({response, params}) {
    try {
      const cards = await Database.table('cards').where('board_id', params.bord_id)
      return response.status(200).json(cards)
    } catch (error) {
      return response.status(500).json({message: 'Erro na listagem de cartões.', error})
    }
  }

  async create({request, response}) {
    try {
      const card = await Card.create(request.all())
      return response.status(200).json(card);
    } catch (error) {
      return response.status(500).json({message: 'Erro ao criar o cartão.', error})
    }
  }

  async update({params, response, request}) {
    try {
    let card = await Card.find(params.id)
      if (request.input('title'))  card.title = request.input('title')
      if (request.input('description'))  card.color = request.input('description')
      await card.save()
      return response.status(200).json(card);
    } catch (error) {
      return response.status(500).json({message: 'Erro ao atualizar o cartão.', error})
    }
  }

  async card({response, params}) {
    try {
      const card = await Database.table('cards').where('id', params.id).first()
      return response.status(200).json(card)
    } catch (error) {
      return response.status(500).json({message: 'Erro ao buscar o cartão.'})
    }
  }

  async delete({params, response}) {
    try {
      let card = await Card.find(params.id)
      await card.delete()
      return response.status(200).json({message: 'Cartão removido com sucesso.'})
    } catch (error) {
      return response.status(500).json({message: 'Erro ao excluir o cartão.', error})
    }
  }


}

module.exports = CardController
