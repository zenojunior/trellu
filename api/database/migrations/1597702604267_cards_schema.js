'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CardsSchema extends Schema {
  up () {
    this.table('cards', (table) => {
      table.boolean('archived').notNullable().default(0)
      table.datetime('date').nullable()
    })
  }

  down () {
    this.table('cards', (table) => {
      table.drop('archived')
      table.drop('date')
    })
  }
}

module.exports = CardsSchema
