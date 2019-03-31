'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TypesSchema extends Schema {
  up () {
    this.create('types', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.text('translate')
      table.integer('subcategory_id').notNullable().unsigned().references('subcategories.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('types')
  }
}

module.exports = TypesSchema
