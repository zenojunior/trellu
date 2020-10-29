'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Version extends Model {
  static get table() {
    return 'versions'
  }
}

module.exports = Version
