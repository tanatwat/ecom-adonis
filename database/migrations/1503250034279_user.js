'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments('id')
      table.integer('client_id').notNullable().unsigned().references('clients.id').onDelete('cascade')
      table.string('username', 30).notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.timestamp('verified_at').notNullable()
      table.string('name').notNullable()
      table.text('address')
      table.string('phone', 20)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
