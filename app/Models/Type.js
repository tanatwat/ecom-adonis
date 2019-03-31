'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Type extends Model {
  subcategory() {
    return this.belongsTo('App/Models/Subcategory')
  }

  static get createdAtColumn() {
    return null
  }
  
  static get updatedAtColumn() {
    return null
  }
}

module.exports = Type
