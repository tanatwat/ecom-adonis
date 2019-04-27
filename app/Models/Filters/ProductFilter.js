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
    if(val == 'true') {
      return this.whereNotNull('discount_price')
    } else if (val == 'false') {
      return this.whereNull('discount_price')
    } else if (val == 'all') {
      return
    }
  }

  order (val) {
    if (val == 'min') {
      return this.orderBy('price', 'asc').orderBy('discount_price', 'asc');
    } else {
      return this.orderBy('price', 'desc').orderBy('discount_price', 'desc');
    }
  }

}

module.exports = ProductFilter
