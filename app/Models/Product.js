'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const ProductFilter = use('./Filters/ProductFilter')

class Product extends Model {
  static boot () {
    super.boot()
    this.addTrait('@provider:Filterable', ProductFilter)
  }
  static get primaryKey () {
    return 'uid'
  }
  category() {
    return this.belongsTo('App/Models/Category');
  }
  subcategory() {
    return this.belongsTo('App/Models/Subcategory');
  }
  type() {
    return this.belongsTo('App/Models/Type');
  }
  brand() {
    return this.belongsTo('App/Models/Brand');
  }
  photos() {
    return this.hasMany('App/Models/ProductImage');
  }
}

module.exports = Product
