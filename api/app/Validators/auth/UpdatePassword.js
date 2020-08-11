'use strict'

class UpdatePassword {

  get rules () {
    return {
      password: 'required|min:6',
      newPassword: 'required|min:6',
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
      'password.required': 'Senha é obrigatória',
      'newPassword.required': 'Nova senha é obrigatória',
      'password.min': 'A senha deve possuir ao menos 6 caracteres',
      'newPassword.min': 'A nova senha deve possuir ao menos 6 caracteres'
    }
  }

  async fails (errors) {
    return this.ctx.response.status(400).json({
      message: "Ops! Algo está errado da requisição",
      errors: errors
    })
  }

}

module.exports = UpdatePassword
