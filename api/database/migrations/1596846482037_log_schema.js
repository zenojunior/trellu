'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LogSchema extends Schema {
  up () {
    this.create('logs', (table) => {
      table.increments()
      table.string('description', 255).notNullable()
      table.string('level', 80).notNullable()
      table.string('event', 80).notNullable()
      table.string('row_id', 80).nullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()

    })
  }

  down () {
    this.drop('logs')
  }
}

module.exports = LogSchema
