'use strict'
const Board = use('App/Models/Board')

class BoardSeeder {
  async dependencies() {
    return [
      'UserSeeder.js'
    ]
  }
  async run() {
    await Board.create({
      id: 1,
      title: 'Teste',
      color: '#7957d5',
      user_id: 1
    })
  }
}

module.exports = BoardSeeder
