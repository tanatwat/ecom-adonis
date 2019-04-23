'use strict'

/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class AdminSeeder {
  async run () {
    await Database.table('clients').insert({
      site: 'test.com',
      email: 'test@gmail.com',
      password: '159352',
      plan: 'ecom-1',
      name: 'Test Client User',
      address: 'Test Client User Address',
      phone: '0900000001',
    })
  }
}

module.exports = AdminSeeder
