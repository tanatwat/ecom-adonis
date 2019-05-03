'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BannersSchema extends Schema {
  up () {
    this.create('banners', (table) => {
      table.increments()
      table.integer('client_id').notNullable().unsigned().references('clients.id').onDelete('cascade')
      table.text('files').notNullable().defaultTo('[]')
    })
  }

  down () {
    this.drop('banners')
  }
}

module.exports = BannersSchema
