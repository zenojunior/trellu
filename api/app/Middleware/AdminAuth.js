'use strict'

const user = use('App/Models/User')
class AdminAuth {

  async handle({request, auth, response}, next) {
      await auth.check()

      if (auth.user.group_id === user.adminGroup){
        return response.status(403).json("Usuário sem acesso")
      }
      await next()
  }
}

module.exports = AdminAuth
