'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RatingsSchema extends Schema {
  up () {
    this.create('ratings', (table) => {
      table.increments()
      table.integer('client_id').notNullable().unsigned().references('clients.id').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('cascade')
      table.integer('product_id').notNullable().unsigned().references('products.id').onDelete('cascade')
      table.integer('points', 1).notNullable()
      table.text('comment')
      table.timestamps()
    })
  }

  down () {
    this.drop('ratings')
  }
}

module.exports = RatingsSchema
