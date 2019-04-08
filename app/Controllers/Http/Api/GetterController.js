'use strict'

const Database = use('Database')
const Category = use('App/Models/Category')
const Brand = use('App/Models/Brand')
const Product = use('App/Models/Product')

class GetterController {

  async getProduct ({request, response, params}) {
    const product = await Product.find(params.uid)

    await product.loadMany(['category', 'subcategory', 'type', 'brand', 'photos'])

    response.send(product)
  }

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
