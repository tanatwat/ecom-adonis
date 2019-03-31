'use strict'

const Database = use('Database')
const Brand = use('App/Models/Brand')

class CategoryController {

  async index({request, response}) {
    const brands = await Brand.query().fetch()

    return brands;
  }

  async store ({request, response}) {

    const brand = await Brand.create({
      name: request.post().brand
    })

    return brand;

  }

  async update ({request, response, params}) {

    return await Database
    .table( request.post().database + 'brands')
    .where('id', params.id)
    .update('name', request.post().brand)

  }

  async destroy ({request, response, params}) {

    return await Database
    .table( request.post().database + 'brands')
    .where('id', params.id)
    .delete()

  }
}

module.exports = CategoryController
