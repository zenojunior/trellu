'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VersionsSchema extends Schema {
  up () {
    this.create('versions', (table) => {
      table.increments()
      table.string('version')
      table.timestamps()
    })
  }

  down () {
    this.drop('versions')
  }
}

module.exports = VersionsSchema
