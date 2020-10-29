'use strict'

const Model = use('Model')

class Log extends Model {
  static get table() {
    return 'logs'
  }
  user () {
    return this.belongsTo('App/Models/User')
  }
  version () {
    return this.belongsTo('App/Models/Version')
  }
}

module.exports = Log
