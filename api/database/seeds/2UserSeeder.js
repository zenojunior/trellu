'use strict'
const User = use('App/Models/User')

class UserSeeder {
  async dependencies() {
    return [
      'GroupSeeder'
    ]
  }
  async run() {
    await User.create({
      id: 1,
      username: 'cristine',
      name: 'Cristine',
      email: 'cris.scheib@hotmail.com',
      password: 'teste123',
      group_id: 1
    })
  }
}

module.exports = UserSeeder
