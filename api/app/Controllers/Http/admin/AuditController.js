'use strict'

const Audit = use('App/Models/Audit')
const logger = use('App/Helpers/Logger')

class AuditController {

  async audits({response, auth, request}) {
    try {
      const page = request.input('page') === undefined ? 1 : request.input('page')
      const audits = await Audit.query().paginate(page)
      return response.status(200).json(audits)
    } catch (error) {
      await logger('error', 'Erro na listagem de auditorias', auth, error)
      return response.status(500).json({message: 'Erro na listagem de auditorias', error})
    }
  }

  async audit({response, auth, params}) {
    try {
      const audit = await Audit.find(params.id)
      return response.status(200).json(audit)
    } catch (error) {
      await logger('error', 'Erro ao buscar a auditoria', auth, error)
      return response.status(500).json({message: 'Erro ao buscar a auditoria', error})
    }
  }

  async delete({params, auth, response}) {
    try {
      await Audit.findOrFail(params.id).delete()
      return response.status(200).json({message: 'Auditoria removida com sucesso.'})
    } catch (error) {
      await logger('error', 'Erro ao excluir a auditoria', auth, error)
      return response.status(500).json({message: 'Erro ao excluir a auditoria.', error})
    }
  }

}

module.exports = AuditController
