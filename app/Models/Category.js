'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {

  static boot () {
    super.boot()
    this.addTrait('NoTimeStamp')
    this.addTrait('Owner')
  }

  subcategory() {
    return this.hasMany('App/Models/Subcategory')
  }

}

module.exports = Category
