'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubcategoriesSchema extends Schema {
  up () {
    this.create('subcategories', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.text('translate')
      table.integer('category_id').notNullable().unsigned().references('categories.id').onDelete('cascade')
      table.integer('client_id').notNullable().unsigned().references('clients.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('subcategories')
  }
}

module.exports = SubcategoriesSchema
