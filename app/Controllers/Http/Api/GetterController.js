'use strict'

const Database = use('Database')
const Category = use('App/Models/Category')
const Brand = use('App/Models/Brand')
const Product = use('App/Models/Product')

class GetterController {


  async getProductsPagiante({ request, response }) {
    const products = await Product.query()
      .ownerIs(request.header("Client"))
      .filter(request.all())
      .paginate(request.get().page, 30);

    response.send(products.toJSON());
  }

  async getProduct ({response, params}) {
    const product = await Product.find(params.uid)

    await product.loadMany(['category', 'subcategory', 'type', 'brand', 'photos'])

    response.send(product)
  }

  async getDiscountProducts ({request, response}) {
    const products = await Product.query()
    .ownerIs(request.header("Client"))
    .filter(request.all())
    .whereNotNull('discount_price')
    .fetch()

    response.send(products)
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
