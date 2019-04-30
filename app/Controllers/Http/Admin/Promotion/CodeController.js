'use strict'

const Database = use('Database')

class CodeController {
   async get ({request}) {
      return await Database.table('codes').where('client_id', request.header('Client'))
   }

   async store({request}) {
      const {code, value , type} = request.all()

      await Database.table('codes').insert({
         client_id: request.header('Client'),
         code: code,
         value: value,
         type: type
      })

      return 'success'
   }

   async destroy({request, params}) {
      await Database.table('codes')
      .where('client_id', request.header('Client'))
      .where('id', params.id)
      .del()
   }
}

module.exports = CodeController
