'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class List extends Model {
  cards() {
    return this.hasMany('App/Models/Card')
  }
}

module.exports = List
