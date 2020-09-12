'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CardsSchema extends Schema {
  up () {
    this.create('cards', (table) => {
      table.increments()
      table.string('title', 120).notNullable()
      table.text('description', 120).notNullable()
      table.integer('order', 2).nullable()
      table.integer('list_id').unsigned().references('id').inTable('lists')
      table.boolean('archived').default(0)
      table.dateTime('date').nullable()
      table.boolean('concluded').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cards')
  }
}

module.exports = CardsSchema
