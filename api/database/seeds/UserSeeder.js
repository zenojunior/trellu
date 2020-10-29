'use strict'
const Factory = use('Factory')

class UserSeeder {
  async run() {
    const groupAdmin = await Factory.model('App/Models/Group').create({name: 'Admin'})
    const groupNormal = await Factory.model('App/Models/Group').create({name: 'Membro'})
    await Factory.model('App/Models/User').createMany(3, [
      {
        name: 'Zeno Junior',
        username: 'zeenojr',
        email: 'me@zenojunior.com',
        password: 'teste123',
        group_id: groupAdmin.id
      },
      {
        name: 'Cristine',
        username: 'cristine',
        email: 'cris.scheib@hotmail.com',
        password: 'teste123',
        group_id: groupAdmin.id
      },
      {
        name: 'Zé João da Silva',
        username: 'Joao',
        email: 'joao@gmail.com',
        password: 'teste123',
        group_id: groupNormal.id
      },
    ])
  }
}

module.exports = UserSeeder
