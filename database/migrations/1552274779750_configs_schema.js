'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConfigsSchema extends Schema {
  up () {
    this.create('configs', (table) => {
      table.increments()
      table.string('type').notNullable()
      table.string('value')
      table.text('array_value')
      table.boolean('enable').defaultTo(true)

      table.timestamps()
    })
  }

  down () {
    this.drop('configs')
  }
}

module.exports = ConfigsSchema
