'use strict'

const Model = use('Model')

class Audit extends Model {

  static get table() {
    return 'audit'
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Audit
