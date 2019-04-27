'use strict'

const Database = use('Database')

class DiscountController {
   async applyDiscount({request, response, params}) {
      await Database.table('products').where('uid', params.uid).update({
         discount_price: request.post().discount
      })
      response.send('success')
   }
}

module.exports = DiscountController
