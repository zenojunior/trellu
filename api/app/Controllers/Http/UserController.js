'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {

  async edit({response, auth}) {
    const user = await auth.getUser()
    const data = {'name': user.name, 'email': user.email, 'username': user.username}
    if (user) {
      response.status(200).json(data)
      return
    }
    response.status(401).json({message: 'Você deve fazer o login para ver o seu perfil'})
  }

  async update({request, response, auth}) {
    const {email, username, name} = request.all()
    const transition = await Database.beginTransaction()
    try {
      const user = await auth.getUser()
      await Database.table('users').where('id', user.id).update({email, username, name})
      await transition.commit()
      return response.status(200).json({message: 'Usuário atualizado com sucesso.'})
    } catch (error) {
      await transition.rollback()
      return response.status(401).json({message: 'Erro ao atualizar o usuário. Caso o erro persista, entre em contato com o Administrador.'})
    }
  }

  async delete({request, response}) {

  }

  async redirect({ally}) {
    await ally.driver('facebook').redirect()
  }

  async callback({ally, auth}) {
    try {
      const fbUser = await ally.driver('facebook').getUser()

      // user details to be saved
      const userDetails = {
        email: fbUser.getEmail(),
        token: fbUser.getAccessToken(),
        login_source: 'facebook'
      }

      // search for existing user
      const whereClause = {
        email: fbUser.getEmail()
      }

      const user = await User.findOrCreate(whereClause, userDetails)
      await auth.login(user)

      return 'Logged in'
    } catch (error) {
      return 'Unable to authenticate. Try again later'
    }
  }
}

module.exports = UserController
