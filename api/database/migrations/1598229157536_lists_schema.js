'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListsSchema extends Schema {
  up () {
    this.create('lists', (table) => {
      table.increments()
      table.string('title', 120).notNullable()
      table.integer('order', 2).notNullable()
      table.integer('board_id').unsigned().references('id').inTable('boards')
      table.timestamps()
    })
  }

  down () {
    this.drop('lists')
  }
}

module.exports = ListsSchema
