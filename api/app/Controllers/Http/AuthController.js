'use strict'
const Hash = use('Hash')
// const Mail = use('Mail')
const User = use('App/Models/User')

class AuthController {

  // // POST
  // async authorise({request, response, auth}) {
  //   const {email, password} = request.all()
  //   try {
  //     const result = await auth.withRefreshToken().attempt(email, password)
  //     const user = await User.findBy('email', email)
  //     await logger('info', 'User Login', user.id, null, email)
  //     return response.status(200).json(result)
  //   } catch (errors) {
  //     console.log(errors)
  //     errors.email = email
  //     await logger('error', 'User Login: Failed', null, null, errors)
  //     return response.status(401).json({
  //       message: "Darn! Can't authorise you with those details."
  //     })
  //   }
  // }

  // POST
  async register({request, response, auth}) {
    let user = await User.create(request.all());
    await auth.login(user);
    return response.json(user);
  }

  async login({request, response, auth}) {

    const {email, password} = request.all()
    try {
      return await auth.attempt(email, password);
    } catch (error) {
      return response.status(500).json({
        message: 'Something went wrong. Try again or contact admin.',
      })
    }
  }

  async logout({request, response, auth}) {
    try {
      const isLogged = await auth.check();
      if (isLogged) {
        await auth.logout();
      }
      return response.status(403).send('Desconectado')
    } catch (error) {
      return response.status(403).send('Não Logado')
    }


  }


}

module.exports = AuthController
