'use strict'
const User = use('App/Models/User')
const Audit = use('App/Models/Audit')
const Card = use('App/Models/Card')
const Database = use('Database')
const logger = use('App/Helpers/Logger')
const moment = use("moment");
const Mail = use('Mail')
const Helpers = use('Helpers')

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
      let login = []
      let logout = []
      const months = request.input('months')
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      for (let month of months) {
        let year = (month > currentMonth + 1) ? currentYear - 1 : currentYear
        login.push(
          await Audit.query().whereRaw('EXTRACT(MONTH FROM created_at) = ?', [month]).whereRaw('EXTRACT(YEAR FROM created_at) = ?', [year]).where('operation', 'User login').getCount())
        logout.push(
          await Audit.query().whereRaw('EXTRACT(MONTH FROM created_at) = ?', [month]).whereRaw('EXTRACT(YEAR FROM created_at) = ?', [year]).where('operation', 'User logout').getCount())
      }
      return response.status(200).json({login, logout})
    } catch (error) {
      await logger('error', 'Erro na consulta de criação de contas', auth, error)
      return response.status(500).json({message: 'Erro na consulta de login e logout', error})
    }
  }

  async boardsOrdinations({response, auth, request}) {
    try {
      let ordinations = [];
      let begin = moment(request.input('begin'));
      const end = moment(request.input('end'));
      while (begin <= end) {
        let x = moment(begin).valueOf()
        let y = await Audit.query().whereRaw('DATE(created_at) = ?', begin).where('operation', 'Board ordination').getCount()
        ordinations.push([x, y])
        begin = moment(begin).add(1, 'days');
      }
      return response.status(200).json({ordinations})
    } catch (error) {
      await logger('error', 'Erro na consulta de criação de contas', auth, error)
      return response.status(500).json({message: 'Erro na consulta de criação de contas', error})
    }
  }

  async wordsCloud({response, auth}) {
    try {
      let cloud = [];
      let cards = await Card.query().select(Database.raw("regexp_split_to_table(title, ' ') as title")).fetch()
      let words = cards.rows.map(function (item) {
        return item['title'];
      });
      for (let word of words) {
        let x = word
        let y = await Card.query().where('title', 'ilike', '%' + word + '%').getCount()
        cloud.push([x, y])
      }
      return response.status(200).json({cloud})
    } catch (error) {
      await logger('error', 'Erro na consulta da nuvem de palavras', auth, error)
      return response.status(500).json({message: 'Erro na consulta da nuvem de palavras', error})
    }
  }

  async sendEmail({response, auth, request}) {
    try {
      let data = request.only(['email', 'name', 'message', 'subject'])
      const attach = request.file('attach', { size: '2mb' })
      console.log(attach);
      data.attach = attach;
      await Mail.send('emails.report', data, (message) => {
        message.to(data.email, data.name)
          .subject(data.subject)
        if (attach) {
          message.attach(attach.tmpPath, {filename: `Anexo.${data.attach.subtype}`})
        }
      })
      return response.status(200).json({message: 'Email enviado com sucesso'})
    }catch (error) {
      await logger('error', 'Erro ao envia o email', auth, error)
      return response.status(500).json({message: 'Erro ao envia o email', error})
    }
  }

}

module.exports = DashboardController
