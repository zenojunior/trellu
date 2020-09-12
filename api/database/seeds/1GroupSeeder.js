'use strict'
const Group = use('App/Models/Group')

class GroupSeeder {
  async run () {
    await Group.create({
      id: 1,
      name: 'Admin',
    })
  }
}

module.exports = GroupSeeder
