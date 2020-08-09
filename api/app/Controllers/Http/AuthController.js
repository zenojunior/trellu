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
      return response.status(401).json({ message: 'O e-mail ou senha estão incorretos.' })
    }
  }

  async logout({request, response, auth}) {
    try {
      const isLogged = await auth.check();
      if (isLogged) {
        await auth.logout();
      }
      return response.status(200).json({ message: 'Usuário deslogado.' })
    } catch (error) {
      return response.status(200).json({ message: 'Não há usuário autenticado.' })
    }


  }


}

module.exports = AuthController
