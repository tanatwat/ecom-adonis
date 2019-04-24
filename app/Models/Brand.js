'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Brand extends Model {
  
  static boot () {
    super.boot()
    this.addTrait('NoTimeStamp')
    this.addTrait('Owner')
  }

  product() {
    return this.belongsTo('App/Models/Product')
  }
}

module.exports = Brand
