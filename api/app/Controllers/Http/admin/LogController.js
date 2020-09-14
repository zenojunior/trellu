'use strict'

const Log = use('App/Models/Log')
const logger = use('App/Helpers/Logger')

class LogController {

  async logs({response, auth, request}) {
    try {
      const page = request.input('page') === undefined ? 1 : request.input('page')
      const logs = await Log.query().paginate(page)
      return response.status(200).json(logs)
    } catch (error) {
      await logger('error', 'Erro na listagem de logs', auth, error)
      return response.status(500).json({message: 'Erro na listagem de logs', error})
    }
  }

  async log({response, auth, params}) {
    try {
      const log = await Log.find(params.id)
      return response.status(200).json(log)
    } catch (error) {
      await logger('error', 'Erro ao buscar o log', auth, error)
      return response.status(500).json({message: 'Erro ao buscar o log', error})
    }
  }

  async delete({params, auth, response}) {
    try {
      await Log.findOrFail(params.id).delete()
      return response.status(200).json({message: 'Log removido com sucesso.'})
    } catch (error) {
      await logger('error', 'Erro ao excluir o log', auth, error)
      return response.status(500).json({message: 'Erro ao excluir o log.', error})
    }
  }

}

module.exports = LogController
