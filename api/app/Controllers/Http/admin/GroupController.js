'use strict'


const User = use('App/Models/User')
const Board = use('App/Models/Board')
const List = use('App/Models/List')
const Card = use('App/Models/Card')
const Database = use('Database')
const logger = use('App/Helpers/Logger')

class UserController {

  async users({request, response, auth}){
    try{
      const page = request.input('page').length === 0 ? 1 : request.input('page')
      const users = await User.paginate(page)
      return response.status(200).json(users)
    }catch (error) {
      await logger('error','Erro ao listar usuários', auth, error)
    }
  }

  async update({request, response, auth}) {
    const {name, group_id} = request.all()
    const transition = await Database.beginTransaction()
    try {
      const user = await auth.getUser()
      await Database.table('users').where('id', user.id).update({name, group_id})
      await transition.commit()
      return response.status(200).json({message: 'Usuário atualizado com sucesso.'})
    } catch (error) {
      await transition.rollback()
      await logger('error','Erro ao atualizar o usuário', auth, error)
      return response.status(401).json({message: 'Erro ao atualizar o usuário. Caso o erro persista, entre em contato com o Administrador.', error})
    }
  }

  async delete({response, auth, params}) {
    try {
      const user = await User.find(params.id)
      const boards = await Board.query().where('user_id', user.id).get()
      for (let board of boards) {
        const lists = await Database.table('lists').where('board_id', board.id)
        for (let list of lists) {
          await Database.table('cards').where('list_id', list.id).delete()
          await Database.table('lists').where('id', list.id).delete()
        }
      }
      await user.delete()
      return response.status(200).json({message: 'Usuário removido com sucesso.'})
    } catch (error) {
      await logger('error','Erro ao excluir o usuário', auth, error)
      return response.status(500).json({message: 'Erro ao excluir o usuário.', error})
    }
  }

}

module.exports = UserController
