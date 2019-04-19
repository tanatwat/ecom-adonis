'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContactsSchema extends Schema {
  up () {
    this.create('contacts', (table) => {
      table.increments()
      table.integer('client_id').notNullable().unsigned().references('clients.id').onDelete('cascade')
      table.string('type').notNullable()
      table.string('sub').notNullable()
      table.string('body').notNullable()
      table.string('link')
      table.timestamps()
    })
  }

  down () {
    this.drop('contacts')
  }
}

module.exports = ContactsSchema
