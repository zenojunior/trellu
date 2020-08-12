'use strict'

const Hash = use('Hash')
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
    const {name} = request.all()
    const transition = await Database.beginTransaction()
    try {
      const user = await auth.getUser()
      await Database.table('users').where('id', user.id).update({name})
      await transition.commit()
      return response.status(200).json({message: 'Usuário atualizado com sucesso.'})
    } catch (error) {
      await transition.rollback()
      return response.status(401).json({message: 'Erro ao atualizar o usuário. Caso o erro persista, entre em contato com o Administrador.'})
    }
  }

  async updatePassword({request, response, auth}) {

    try {
      const {password, newPassword} = request.all()
      const user = await auth.getUser()
      const passwordValid = await Hash.verify(password, user.password);

      if (!passwordValid) {
        return response.status(400).json({message: "As senhas não são compatíveis."})
      }
      user.password = await Hash.make(newPassword)
      const result = await user.save()
      return response.status(200).json({message: "Senha atualizada."}, result)

    } catch (error) {
      return response.status(500).json({message: 'Erro ao atualizar o usuário. Caso o erro persista, entre em contato com o Administrador.',})

    }
  }

  async delete({request, response}) {
    try {
      let user = await User.find(params.id)
      await user.delete()
      return response.status(200).json({message: 'Usuário removido com sucesso.'})
    } catch (error) {
      return response.status(500).json({message: 'Erro ao excluir o usuário.', error})
    }
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
