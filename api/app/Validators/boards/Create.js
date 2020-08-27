'use strict'

class Create {

  get rules() {
    return {
      title: 'required',
      color: 'required'
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
      'color.required': 'Cor é obrigatória'
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
