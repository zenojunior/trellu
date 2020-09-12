'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupsSchema extends Schema {
  up () {
    this.create('groups', (table) => {
      table.increments()
      table.string('name', 120).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('groups')
  }
}

module.exports = GroupsSchema
