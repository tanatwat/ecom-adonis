'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Brand extends Model {
  product() {
    return this.belongsTo('App/Models/Product')
  }
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }
}

module.exports = Brand
