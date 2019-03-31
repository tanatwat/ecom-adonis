'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShowcaseProductsSchema extends Schema {
  up () {
    this.create('showcase_products', (table) => {
      table.increments()
      table.integer('showcase_id').notNullable().unsigned().references('showcases.id').onDelete('cascade')
      table.integer('product_id').notNullable().unsigned().references('products.id').onDelete('cascade')

      table.timestamps()
    })
  }

  down () {
    this.drop('showcase_products')
  }
}

module.exports = ShowcaseProductsSchema
