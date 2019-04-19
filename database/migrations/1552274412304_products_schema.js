'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.integer('client_id').notNullable().unsigned().references('clients.id').onDelete('cascade')
      table.integer('category_id').notNullable().unsigned().references('categories.id').onDelete('cascade')
      table.integer('subcategory_id').unsigned().references('subcategories.id').onDelete('cascade')
      table.integer('type_id').unsigned().references('types.id').onDelete('cascade')
      table.integer('brand_id').unsigned().references('brands.id').onDelete('cascade')
      table.string('uid').notNullable()
      table.string('name').notNullable()
      table.string('price').notNullable()
      table.string('discount_price')
      table.text('description')
      table.string('thumbnail').notNullable().defaultTo('no_img.jpg')
      table.text('choice')
      table.integer('view_count').notNullable().defaultTo(0)
      table.enu('visibility', ['public', 'private', 'unlisted']).notNullable().defaultTo('public')
      table.boolean('available').notNullable().defaultTo(true)
      table.integer('stock').notNullable().defaultTo(1)
      table.boolean('featured').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
