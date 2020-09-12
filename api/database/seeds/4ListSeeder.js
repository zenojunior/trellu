'use strict'
const List = use('App/Models/List')

class ListSeeder {
  async dependencies() {
    return [
      'BoardSeeder'
    ]
  }
  async run() {
    await List.create({
      id: 1,
      title: 'Teste',
      order: 1,
      board_id: 1,
    })
  }
}

module.exports = ListSeeder
