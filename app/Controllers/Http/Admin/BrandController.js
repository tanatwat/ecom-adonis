'use strict'

const Database = use('Database')
const Brand = use('App/Models/Brand')

class CategoryController {

  async index({request, response}) {
    const brands = await Brand.query().ownerIs(request.header('Client')).fetch()

    response.send(brands)
  }

  async store ({request, response}) {

    const brand = await Brand.create({
      name: request.post().brand,
      client_id: request.header('Client')
    })

    response.send(brand)

  }

  async update ({request, params}) {

    return await Database
    .table('brands')
    .where('id', params.id)
    .where('client_id', request.header('Client'))
    .update('name', request.post().brand)

  }

  async destroy ({request, params}) {

    return await Database
    .table('brands')
    .where('id', params.id)
    .where('client_id', request.header('Client'))
    .delete()

  }
}

module.exports = CategoryController
