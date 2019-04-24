'use strict'

const Database = use('Database')
const Category = use('App/Models/Category')

class CategoryController {

  async get({request, response}) {
    const categories = await Category.query().ownerIs(request.header('Client')).with('subcategory.type').fetch()

    return categories;
  }

  async store ({request, response}) {
    // Insert category first
    const category = await Category.create({
      name: request.post().category,
      client_id: request.header('Client')
    })
    // Followed by insert subcategory
    for (var subcategory of request.post().subcategories) {
      const createdSubcategory = await category.subcategory().create({name: subcategory.name})
      //Check if type is confirmed
      if (request.post().formFilled == true) {
        // Loop through and insert type
        if (subcategory.types.length > 0) {
          for (var type of subcategory.types) {
            await createdSubcategory.type().create({name: type.name})
          }
        }
      }
    }
    // Query the response
    const result = await Category.find(category.id)
    const getSubcategory = await result.load('subcategory.type')

    return result;

  }

  async update ({request, response}) {

    return await Database.table('categories').where('id', params.id)

  }

  async destroy ({request, params}) {

    return await Database.table('categories').where('id', params.id).where('client_id', request.header('client')).delete()

  }
}

module.exports = CategoryController
