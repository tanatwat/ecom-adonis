'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShowcasesSchema extends Schema {
  up () {
    this.create('showcases', (table) => {
      table.increments()
      table.integer('client_id').notNullable().unsigned().references('clients.id').onDelete('cascade')
      table.string('name').notNullable()
      table.boolean('show').notNullable().defaultTo(true)
      table.integer('order').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('showcases')
  }
}

module.exports = ShowcasesSchema
