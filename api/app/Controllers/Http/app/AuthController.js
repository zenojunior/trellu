'use strict'
const Hash = use('Hash')
// const Mail = use('Mail')
const Database = use('Database')
const User = use('App/Models/User')
const logger = use('App/Helpers/Logger')
const auditor = use('App/Helpers/Auditor')

class AuthController {

  // POST
  async register({request, response, auth}) {
    const transition = await Database.beginTransaction()
    try {
      const {name, email, username, group_id} = request.all()
      let user = await User.create(request.all())
      await auth.login(user)
      await transition.commit()
      await auditor('Register of a new user', user.id, 'users', request.headers()['user-agent'], auth)
      return response.status(201).json({name, email, username, group_id})
    } catch (error) {
      await transition.rollback()
      await logger('error','Erro ao cadastrar o usuário', null, error)
      return response.status(500).json({message: 'Erro ao cadastrar o usuário. Caso o erro persista, entre em contato com o Administrador.'})
    }
  }

  async login({request, response, auth}) {

    const {email, password} = request.all()
    try {
      await auth.attempt(email, password)
      const user = await auth.getUser()
      const { name, username } = user;
      await auditor('User login', user.id, 'users', request.headers()['user-agent'], auth)
      return response.status(201).json({name, email, username})
    } catch (error) {
      await logger('info','Tentativa de acesso inválida', null, error)
      return response.status(403).json({message: 'O e-mail ou senha estão incorretos.'})
    }
  }

  async logout({request, response, auth}) {
    try {
      const isLogged = await auth.check()
      if (isLogged) {
        await auditor('Logout', auth.id, 'users', request.headers()['user-agent'], auth)
        await auth.logout();
      }
      return response.status(201).json({message: 'Usuário deslogado.'})
    } catch (error) {
      await logger('error','Não há usuário autenticado', null, error)
      return response.status(403).json({message: 'Não há usuário autenticado.'})
    }


  }


}

module.exports = AuthController
