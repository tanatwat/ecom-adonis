'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.string('site').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('plan').notNullable()
      table.string('name').notNullable()
      table.text('address')
      table.string('phone', 20)
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
