'use strict'

const User = use('App/Models/User')

class UserController {
	
	async redirect({ ally }){
		await ally.driver('facebook').redirect()
  }
  
  async *me({ request, response }) {
    const user = yield request.auth.getUser()
    if (user) {
      response.status(200).json(user)
      return
    }
    response.status(401).json({ message: 'Você deve fazer o login para ver o seu perfil' })
  }

	async callback ({ ally, auth }) {
    try {
      const fbUser = await ally.driver('facebook').getUser()

      // user details to be saved
      const userDetails = {
        email: fbUser.getEmail(),
        token: fbUser.getAccessToken(),
        login_source: 'facebook'
      }

      // search for existing user
      const whereClause = {
        email: fbUser.getEmail()
      }

      const user = await User.findOrCreate(whereClause, userDetails)
      await auth.login(user)

      return 'Logged in'
    } catch (error) {
      return 'Unable to authenticate. Try again later'
    }
  }
}

module.exports = UserController
