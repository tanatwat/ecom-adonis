'use strict'

const Database = use('Database')

class PaymentController {
   async store({request}) {
      const {method, ref, provider} = request.all()
      const created = await Database.table('payment_methods').insert({
         client_id: request.header('Client'),
         method: method,
         ref: ref,
         provider: provider
      })
      return await Database.table('payment_methods').where('id', created)
   }

   async destroy ({request, params}) {
      await Database.table('payment_methods').where('client_id', request.header('Client')).where('id', params.id).del()
   }
}

module.exports = PaymentController
