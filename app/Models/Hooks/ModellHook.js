'use strict'

const Hash = use('Hash')

const ModelHook = exports = module.exports = {}

ModelHook.findClient = async (model) => {
  user.password = await Hash.make(user.password)
}