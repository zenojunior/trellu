'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CardsSchema extends Schema {
  up () {
    this.table('cards', (table) => {
      table.integer('list_id').unsigned().references('id').inTable('lists')
    })
  }

  down () {
    this.table('cards', (table) => {
      table.drop('list_id')
    })
  }
}

module.exports = CardsSchema
