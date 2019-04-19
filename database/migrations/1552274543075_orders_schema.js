'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('client_id').notNullable().unsigned().references('clients.id').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('cascade')
      table.string('title').notNullable()
      table.string('uid').notNullable()
      table.text('body').notNullable()
      table.integer('fee')
      table.integer('total').notNullable()
      table.string('discount')
      table.text('shipping')
      table.string('carrier')
      table.string('tracking')
      table.text('address').notNullable()
      table.timestamp('date_paid')
      table.text('status').notNullable()
      table.text('cancle')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
