'use strict'

class ClientController {

  async login({ auth, request, response }) {
    
    const {email, password} = request.all()

    let token = await auth.authenticator('admin').attempt(email, password)
    response.send(token)

  }

  async check({ auth, response }) {
    try {
      let token = await auth.attempt(email, password)
      return await auth.getUser(token);
    } catch (error) {
      response.send('Missing or invalid jwt token')
    }
  }

}

module.exports = ClientController
