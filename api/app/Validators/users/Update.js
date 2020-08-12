'use strict'

class CreateUpdate {

  get rules() {
    // const { user } = this.ctx.request.post()
    return {
      // username: `required|unique:users,${user.id}`,
      // email: `required|email|unique:users,${user.id}`,
      name: `required`
    }
  }

  get data() {
    const requestBody = this.ctx.request.all()
    requestBody.email = (requestBody.email) ? requestBody.email.trim().toLowerCase() : null
    requestBody.username = (requestBody.username) ? requestBody.username.trim().toLowerCase() : null
    return requestBody
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
      'username.required': 'Usuário é obrigatório',
      'name.required': 'Nome é obrigatório',
      'username.unique': 'Este usuário já está em uso',
      'email.required': 'Endereço de email é obrigatório',
      'email.email': 'Email inválido',
      'email.unique': 'Email já está cadastrado',
    }
  }

  async fails(errors) {
    return this.ctx.response.status(400).json({
      message: "Ops! Algo está errado da requisição",
      errors: errors
    })
  }

}

module.exports = CreateUpdate