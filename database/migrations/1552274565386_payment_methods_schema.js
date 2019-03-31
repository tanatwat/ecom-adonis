'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentMethodsSchema extends Schema {
  up () {
    this.create('payment_methods', (table) => {
      table.increments()
      table.text('method').notNullable()
      table.string('provider').notNullable()
      table.text('translate')
      table.string('ref').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('payment_methods')
  }
}

module.exports = PaymentMethodsSchema
