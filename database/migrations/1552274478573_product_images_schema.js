'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductImagesSchema extends Schema {
  up () {
    this.create('product_images', (table) => {
      table.increments()
      table.integer('product_id').notNullable().unsigned().references('products.id').onDelete('cascade')
      table.string('filename').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('product_images')
  }
}

module.exports = ProductImagesSchema
