'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BannersSchema extends Schema {
  up () {
    this.create('banners', (table) => {
      table.increments()
      table.string('type').notNullable().defaultTo('home')
      table.string('filename').notNullable()
      table.text('text')
      table.text('button')
      table.text('link')
    })
  }

  down () {
    this.drop('banners')
  }
}

module.exports = BannersSchema
