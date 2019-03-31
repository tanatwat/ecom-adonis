'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('cascade')
      table.text('comment').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
