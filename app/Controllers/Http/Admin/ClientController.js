'use strict'

class ClientController {

  async login({ auth, request, response }) {
    
    const {email, password} = request.all()

    let token = await auth.authenticator('admin').attempt(email, password)

    response.send(token)

  }

  async check({ auth, response }) {
    try {
      return await auth.authenticator('admin').getUser();
    } catch (error) {
      response.send(error)
    }
  }

}

module.exports = ClientController
