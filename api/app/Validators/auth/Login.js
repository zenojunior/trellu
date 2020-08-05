'use strict'

class Login {

  get rules() {
    return {
      email: 'required',
      password: 'required',
    }
  }

  get data() {
    const requestBody = this.ctx.request.all()
    requestBody.email = (requestBody.email) ? requestBody.email.trim().toLowerCase() : null
    return requestBody
  }

  get messages() {
    return {
      'email.required': 'Endereço de email é obrigatório',
      'password.required': 'Senha é obrigatória',

    }
  }

  async fails(errors) {
    return this.ctx.response.status(400).json({
      message: "Ops! Algo est errado da requisição",
      errors: errors
    })
  }

}

module.exports = Login
