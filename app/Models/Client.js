'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {
    category() {
        return this.hasMany('App/Models/Category')
    }
    subcategory() {
        return this.hasMany('App/Models/Subcategory')
    }
    type() {
        return this.hasMany('App/Models/Type')
    }
}

module.exports = Client
