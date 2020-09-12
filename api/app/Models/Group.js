'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class Board extends Model {

  lists() {
    return this.hasMany('App/Models/List')
  }
}

module.exports = Board
