'use strict'

class Create {

  get rules() {
    return {
      title: 'required',
      description: 'required',
      list_id: 'required'
    }
  }

  get data() {
  }

  get sanitizationRules() {
    return {
      // it has prblm with dots in email
      // me.amitkhare@gmail.com => meamitkhare@gmail.com
      // email: 'normalize_email'
    }
  }

  get messages() {
    return {
      'title.required': 'Título é obrigatório',
      'description.required': 'Descrição é obrigatória',
      'list_id.required': 'List é obrigatória',
    }
  }

  async fails(errors) {
    return this.ctx.response.status(400).json({
      message: "Ops! Algo está errado da requisição",
      errors: errors
    })
  }

}

module.exports = Create
