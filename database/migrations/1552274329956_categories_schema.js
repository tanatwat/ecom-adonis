'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriesSchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.text('translate')
      table.integer('client_id').notNullable().unsigned().references('clients.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategoriesSchema
