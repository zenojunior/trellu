'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')
const Database = use('Database')
const logger = use('App/Helpers/Logger')
const auditor = use('App/Helpers/Auditor')

class UserController {

  async user({response, auth}) {
    try {
      let user = await auth.getUser()
      user.admin = auth.user.group_id === user.adminGroup()
      return response.status(200).json(user)
    } catch (error) {
      await logger('error', 'Erro ao buscar usuário', auth, error)
      return response.status(500).json({message: 'Erro na buscar usuário', error})
    }
  }

  async update({request, response, auth}) {
    const {name, group_id} = request.all()
    const transition = await Database.beginTransaction()
    try {
      const user = await auth.getUser()
      await Database.table('users').where('id', user.id).update({name, group_id})
      await transition.commit()
      await auditor('User updated', user.id, 'users',request.headers()['user-agent'], auth)
      return response.status(200).json({message: 'Usuário atualizado com sucesso.'})
    } catch (error) {
      await transition.rollback()
      await logger('error','Erro ao atualizar o usuário', auth, error)
      return response.status(401).json({message: 'Erro ao atualizar o usuário. Caso o erro persista, entre em contato com o Administrador.', error})
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
      user.password = newPassword
      await auditor('Update on password', user.id, 'users', request.headers()['user-agent'], auth)
      const result = await user.save()
      return response.status(200).json({message: "Senha atualizada."}, result)

    } catch (error) {
      await logger('error','Erro ao atualizar o usuário', auth, error)
      return response.status(500).json({message: 'Erro ao atualizar o usuário. Caso o erro persista, entre em contato com o Administrador.', error})

    }
  }

  async delete({response, auth, params}) {
    try {
      const user = await User.findOrFail(params.id)
      const boards = await Database.table('boards').where('user_id', user.id)
      for (let board of boards) {
        const lists = await Database.table('lists').where('board_id', board.id)
        for (let list of lists) {
          await Database.table('cards').where('list_id', list.id).delete()
          await Database.table('lists').where('id', list.id).delete()
        }
      }
      await Database.table('boards').where('user_id', user.id).delete()
      await user.delete()
      return response.status(200).json({message: 'Usuário removido com sucesso.'})
    } catch (error) {
      await logger('error', 'Erro ao excluir o usuário', auth, error)
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
