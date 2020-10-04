'use strict'

const Audit = use('App/Models/Audit')
const logger = use('App/Helpers/Logger')
const Database = use('Database')
const SpreadSheet = use('SpreadSheet')

class AuditController {

  async audits({response, auth, request}) {
    try {
      const {user_id, affected_table} = request.all()
      const page = request.input('page') === undefined ? 1 : request.input('page')
      const query = Audit.query()

      const audits = await query.paginate(page, 10)
      return response.status(200).json(audits)
    } catch (error) {
      await logger('error', 'Erro na listagem de auditorias', auth, error)
      return response.status(500).json({message: 'Erro na listagem de auditorias', error})
    }
  }

  async export({response, auth, request}) {
    const csv = new SpreadSheet()
    let audit = await Audit.with('user').get()
    console.log(audit)
    const data = []
    data.push([
      'ID',
      'Operation',
      'Affected ID',
      'Affected Table',
      'Platform',
      'User'
    ])
    // audit.toJSON().forEach((audit) => {
    //   data.push([
    //     audit.operation,
    //     audit.affected_id,
    //     audit.affected_table,
    //     audit.platform,
    //     audit.user.name
    //   ])
    // })
    csv.addSheet('Audit-' + Date.getDate(), data)
    csv.download('users-export')
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
