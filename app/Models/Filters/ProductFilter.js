'use strict'

const ModelFilter = use('./Filter')

class ProductFilter extends ModelFilter {

  // This will filter the query string 'c_id' OR 'c'
  c (id) {
    return this.where('category_id', +id)
  }

  sub (id) {
    return this.where('subcategory_id', +id)
  }

  type (id) {
    return this.where('type_id', +id)
  }

  name (name) {
    return this.where('name', 'LIKE', `%${name}%`)
  }

  max (val) {
    return this.where('price', '<=', +val)
  }

  min (val) {
    return this.where('price', '>=', +val)
  }

  dc (val) {
    return this.whereNotNull('discount_price')
  }

  order (val) {
    if (val == 'min') {
      return this.orderBy('discount_price', 'asc').orderBy('price', 'asc');
    } else {
      return this.orderBy('discount_price', 'desc').orderBy('price', 'desc');
    }
  }

}

module.exports = ProductFilter
