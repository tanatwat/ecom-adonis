'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShippingsSchema extends Schema {
  up () {
    this.create('shippings', (table) => {
      table.increments()
      table.string('method').notNullable()
      table.integer('fee')
      table.integer('multiply')
      table.text('promotion')
      table.timestamps()
    })
  }

  down () {
    this.drop('shippings')
  }
}

module.exports = ShippingsSchema
