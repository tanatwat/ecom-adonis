'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const ProductFilter = use('./Filters/ProductFilter')

class Product extends Model {
  static boot () {
    super.boot()
    this.addTrait('@provider:Filterable', ProductFilter)
    this.addTrait('Owner')
  }
  static get primaryKey () {
    return 'uid'
  }
  getChoice (choice) {
    return JSON.parse(choice)
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
    // hasOne(relatedModel, primaryKey, foreignKey)
    return this.hasMany('App/Models/ProductImage', 'id', 'product_id');
  }
}

module.exports = Product
