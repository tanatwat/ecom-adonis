'use strict'

const Database = use('Database')
const Code = use('App/Models/Code')

class CodeController {
   async get ({request}) {
      return await Database.table('codes').where('client_id', request.header('Client'))
   }

   async store({request, response}) {

      const {code, value , type} = request.all()

      const check = await Database.table('codes')
      .where('client_id', request.header('Client'))
      .where('code', code)
      .first()
      // Chedck if code exists
      if(!check) {
         const created = await Database.table('codes').insert({
            client_id: request.header('Client'),
            code: code,
            value: value,
            type: type
         })
         response.send({id: created[0]})
      } else {
         response.status(406).send('โค๊ดไม่สามารถซ้ำกันได้')
      }

   }

   async destroy({request, params}) {
      await Database.table('codes')
      .where('client_id', request.header('Client'))
      .where('id', params.id)
      .del()
   }
}

module.exports = CodeController
