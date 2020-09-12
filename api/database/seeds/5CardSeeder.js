'use strict'
const Card = use('App/Models/Card')

class CardSeeder {
  async dependencies() {
    return [
      'CardSeeder'
    ]
  }
  async run() {
    await Card.create({
      id: 1,
      title: 'Teste',
      description: 'Teste',
      order: 1,
      list_id: 1,
    })
  }
}

module.exports = CardSeeder
