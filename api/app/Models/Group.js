'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class Group extends Model {

  users() {
    return this.hasMany('App/Models/Users')
  }
}

module.exports = Group
