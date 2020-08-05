'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoardsSchema extends Schema {
  up () {
    this.create('boards', (table) => {
      table.increments()
      table.string('title', 120).notNullable()
      table.string('color', 60).notNullable()
      table.boolean('featured').notNullable().default(0)
      table.json('structure', 120).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()

    })
  }

  down () {
    this.drop('boards')
  }
}

module.exports = BoardsSchema
