'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Subcategory extends Model {
  category() {
    return this.belongsTo('App/Models/Category')
  }

  type() {
    return this.hasMany('App/Models/Type')
  }

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }
}

module.exports = Subcategory
