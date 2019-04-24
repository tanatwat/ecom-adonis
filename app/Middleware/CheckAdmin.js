'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')

class CheckAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, request }, next) {
    // call next to advance the request
    try {
      await auth.authenticator('admin').check()
      await next()
    } catch (error) {
      return 'Not authenticated'
    }
    
  }
}

module.exports = CheckAdmin
