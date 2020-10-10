'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuditSchema extends Schema {

  up () {
    this.create('audit', (table) => {
      table.increments()
      table.string('operation', 200).notNullable()
      table.integer('affected_id').unsigned().notNullable()
      table.string('affected_table', 20).notNullable()
      table.string('platform', 300).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('audit')
  }
}

module.exports = AuditSchema
