'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuditSchema extends Schema {
  up () {
    this.create('audit', (table) => {
      table.increments()
      table.string('operation', 1).notNullable()
      table.integer('affected_id').unsigned().notNullable()
      table.string('affected_table', 20).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('audit')
  }
}

module.exports = AuditSchema
