'use strict'
const Factory = use('Factory')

class UserSeeder {
  async run() {
    const group = await Factory.model('App/Models/Group').create({name: 'Admin'})
    await Factory.model('App/Models/User').createMany(2, [
      {
        name: 'Zeno Junior',
        username: 'zeenojr',
        email: 'me@zenojunior.com',
        password: 'teste123',
        group_id: group.id
      },
      {
        name: 'Cristine',
        username: 'cristine',
        email: 'cris.scheib@hotmail.com',
        password: 'teste123',
        group_id: group.id
      },
    ])
  }
}

module.exports = UserSeeder
