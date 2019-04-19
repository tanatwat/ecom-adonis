'use strict'

const Hash = use('Hash')

class ClientController {
  async login({ auth, request, response }) {
    
    const {email, password} = request.all()

    let token = await auth.attempt(email, password)
    return token
    // try {
    //   await auth.check()
    //   return auth.getUser();
    // } catch (error) {
    //   response.send('Missing or invalid jwt token')
    // }

  }
  async check({ auth, request, response }) {
    try {
      await auth.check()
      return auth.getUser();
    } catch (error) {
      response.send('Missing or invalid jwt token')
    }
  }
}

module.exports = ClientController
