'use strict'

const Database = use('Database')
const Category = use('App/Models/Category')
const Brand = use('App/Models/Brand')

class GetterController {

  async productUpload({request, response}) {

    const categories = await Category.query().with('subcategory.type').fetch()
    const brands = await Brand.all()
    const result = {
      categories: categories,
      brands: brands
    }
    
    return result
  }

}

module.exports = GetterController
