'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CodesSchema extends Schema {
  up () {
    this.create('codes', (table) => {
      table.increments()
      table.string('code', 25)
      table.integer('value')
      table.string('type')
      table.boolean('enabled').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('codes')
  }
}

module.exports = CodesSchema
