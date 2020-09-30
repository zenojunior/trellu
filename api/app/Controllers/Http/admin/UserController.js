'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')
const Database = use('Database')
const logger = use('App/Helpers/Logger')
const auditor = use('App/Helpers/Auditor')

class UserController {

  async users({request, response, auth}) {
    try {
      const page = request.input('page') === undefined ? 1 : request.input('page')
      const users = await User.query().select('id', 'name', 'username', 'email', 'group_id').paginate(page)
      return response.status(200).json(users)
    } catch (error) {
      await logger('error', 'Erro ao listar usuários', auth, error)
      return response.status(500).json({message: 'Erro na listagem de usuários', error})
    }
  }

  async update({request, response, auth}) {
    const {name, group_id, id, email} = request.all()
    const user = await User.findOrFail(id)
    try {
      user.name = name;
      user.group_id = group_id;
      user.email = email;
      user.save()
      await auditor('User updated', user.id, 'users', 'navigator.platform', auth)
      return response.status(200).json({message: 'Usuário atualizado com sucesso.'})
    } catch (error) {
      await logger('error','Erro ao atualizar o usuário', auth, error)
      return response.status(403).json({message: 'Erro ao atualizar o usuário. Caso o erro persista, entre em contato com o Administrador.', error})
    }
  }

  async create({request, response, auth}) {
    try {
      const user = await User.create(request.all())
      return response.status(200).json({message: `A conta de ${user.name.split(' ').shift()} foi criada.`})
    } catch (error) {
      await logger('error','Erro ao criar o usuário', auth, error)
      return response.status(403).json({message: 'Erro ao atualizar o usuário. Caso o erro persista, entre em contato com o Administrador.', error})
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
      await auditor('User deleted', user.id, 'users', 'navigator.platform', auth)
      await user.delete()
      return response.status(200).json({message: 'Usuário removido com sucesso.'})
    } catch (error) {
      await logger('error', 'Erro ao excluir o usuário', auth, error)
      return response.status(500).json({message: 'Erro ao excluir o usuário.', error})
    }
  }

}

module.exports = UserController
