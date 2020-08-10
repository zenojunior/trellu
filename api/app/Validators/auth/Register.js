'use strict'

class Register {

  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|min:6',
      name: 'required'
    }
  }

  get data () {
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

  get messages () {
    return {
      'username.required': 'Usuário é obrigatório',
      'name.required': 'Nome é obrigatório',
      'username.unique': 'Este usuário já está em uso',
      'email.required': 'Endereço de email é obrigatório',
      'email.email': 'Email inválido',
      'email.unique': 'Email já está cadastrado',
      'password.required': 'Senha é obrigatória',
      'password.min': 'A senha deve possuir ao menos 6 caracteres'
    }
  }

  async fails (errors) {
    return this.ctx.response.status(400).json({
      message: "Ops! Algo está errado da requisição",
      errors: errors
    })
  }

}

module.exports = Register
