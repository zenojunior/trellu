'use strict'


const Group = use('App/Models/Group')
const Database = use('Database')
const logger = use('App/Helpers/Logger')
const auditor = use('App/Helpers/Auditor')

class GroupController {

  async groups({response, auth}) {
    try {
      const groups = await Group.all()
      return response.status(200).json(groups)
    } catch (error) {
      await logger('error', 'Erro na listagem de grupos', auth, error)
      return response.status(500).json({message: 'Erro na listagem de grupos', error})
    }
  }

  async create({request, response, auth}) {
    try {
      const group = await Group.create(request.all())
      return response.status(200).json(group)
    } catch (error) {
      await logger('error', 'Erro ao criar o grupo', auth, error)
      return response.status(500).json({message: 'Erro ao criar o grupo', error})
    }
  }

  async update({params, response, auth, request}) {
    try {
      let group = await Group.find(params.id)
      if (request.input('name')) group.name = request.input('name')
      await group.save()
      return response.status(200).json(group)
    } catch (error) {
      await logger('error', 'Erro ao atualizar o grupo', auth, error)
      return response.status(500).json({message: 'Erro ao atualizar o grupo', error})
    }
  }

  async group({response, auth, params}) {
    try {
      const group = await Group.find(params.id)
      return response.status(200).json(group)
    } catch (error) {
      await logger('error', 'Erro ao buscar o grupo', auth, error)
      return response.status(500).json({message: 'Erro ao buscar o grupo', error})
    }
  }

  async delete({params, auth, response}) {
    const transition = await Database.beginTransaction()
    try {
      const group = await Group.findOrFail(params.id)
      const users = await Database.table('users').where('group_id', params.id)
      if(users.length !== 0){
        await logger('error', 'Operação inválida. Usuários vinculados ao grupo.', auth)
        return response.status(403).json({title: 'Exclusão bloqueada', message: 'Não é possível excluir o grupo pois existem usuários vinculados a ele.'})
      }
      await auditor('Group deleted', group.id, 'groups', navigator.platform, auth)
      await group.delete()
      await transition.commit()
      return response.status(200).json({message: 'Grupo removido com sucesso.'})
    } catch (error) {
      await transition.rollback()
      await logger('error', 'Erro ao excluir o grupo', auth, error)
      return response.status(500).json({message: 'Erro ao excluir o grupo.', error})
    }
  }

}

module.exports = GroupController
