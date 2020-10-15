'use strict'
const User = use('App/Models/User')
const Audit = use('App/Models/Audit')
const logger = use('App/Helpers/Logger')
const moment = use("moment");

class DashboardController {

  async accountsCreation({response, auth, request}) {
    try {
      const date = request.input('date');
      const query = User.query()
      if (date) query.whereRaw('DATE(created_at) >= ?', [date])
      const accounts = await query.getCount()
      return response.status(200).json({total: accounts})
    } catch (error) {
      await logger('error', 'Erro na consulta de criação de contas', auth, error)
      return response.status(500).json({message: 'Erro na consulta de criação de contas', error})
    }
  }

  async loginsLogouts({response, auth, request}) {
    try {
      const user = await auth.getUser()
      let login = []
      let logout = []
      const months = request.input('months')
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      for (let month of months){
        let year = (month > currentMonth) ? currentYear - 1 : currentYear
        login.push(
          await Audit.query().whereRaw('EXTRACT(MONTH FROM created_at) = ?', [month]).whereRaw('EXTRACT(YEAR FROM created_at) = ?', [year]).where('operation', 'User login').where('user_id', user.id).getCount())
        logout.push(
          await Audit.query().whereRaw('EXTRACT(MONTH FROM created_at) = ?', [month]).whereRaw('EXTRACT(YEAR FROM created_at) = ?', [year]).where('operation', 'User logout').where('user_id', user.id).getCount())
      }
      return response.status(200).json({login, logout})
    } catch (error) {
      await logger('error', 'Erro na consulta de criação de contas', auth, error)
      return response.status(500).json({message: 'Erro na consulta de login e logout', error})
    }
  }

  async boardsOrdinations({response, auth, request}) {
    try {
      const user = await auth.getUser()
      let ordinations = [];
      let begin = moment(request.input('begin'));
      const end = moment(request.input('end'));
      while (begin <= end) {
        let x = moment(begin).valueOf()
        let y = await Audit.query().whereRaw('DATE(created_at) = ?', begin).where('operation', 'Board ordination').where('user_id', user.id).getCount()
        ordinations.push([x,y])
        begin = moment(begin).add(1, 'days');
      }
      return response.status(200).json({ordinations})
    } catch (error) {
      await logger('error', 'Erro na consulta de criação de contas', auth, error)
      return response.status(500).json({message: 'Erro na consulta de criação de contas', error})
    }
  }

}

module.exports = DashboardController
