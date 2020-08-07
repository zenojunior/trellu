'use strict'

class Authorise {

  get rules() {
    return {
      email: 'required|email|unique',
      password: 'required',
      username: 'required|unique',
      name: 'required'
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
      'email.email': 'Endereço de email inválido',
      'email.unique': 'Endereço de email já cadastrado',
      'password.required': 'Senha  obrgatória',
      'username.required': 'Nome de usuário é obrigatório',
      'username.unique': 'Nome de usuário já cadastrado',
      'name.required': 'Nome é obrigatório',

    }
  }

  async fails(errors) {
    return this.ctx.response.status(400).json({
      message: "Ops! Algo est errado da requisição",
      errors: errors
    })
  }

}

module.exports = Authorise
