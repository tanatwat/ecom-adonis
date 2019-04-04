'use strict'

const sharp = require('sharp')
const shortid = require('shortid')
const Helpers = use('Helpers')
const Drive = use('Drive')
const Database = use('Database')
const Product = use('App/Models/Product')

class ProductCrudController {

  async index ({request, response}) {

    return await Database.table( 'ecom.' + 'products').first()

  }

  async show ({request, response, params}) {

    return await Database.table( 'homestead.' + 'products').where('id', params.id)

  }

  async store ({request, response}) {
    let filesName = {
      thumbnail: null,
      photos: []
    }
    request.multipart.file('thumbnail', {}, async file => {
      const thumbnailName = shortid.generate() + '.jpg'
      const data = sharp()
        .resize(200,200, {
          kernel: sharp.kernel.nearest,
          quality: 70,
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .jpeg({quality: 80})
        .toFormat('jpeg')
        file.stream.pipe(data).pipe(file.stream)
        await Drive.disk('s3').put('thumbnail/' + thumbnailName, data)
        filesName.thumbnail = thumbnailName
    })
    for (let i = 0; i < 7; i++) {
    request.multipart.file('files[' + i + ']', {}, async file => {
        let photoName = shortid.generate() + '.jpg'
        let transform = sharp()
          .resize(400,400, {
            kernel: sharp.kernel.nearest,
            quality: 70,
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          })
          .jpeg({quality: 90})
          .toFormat('jpeg')
        file.stream.pipe(transform).pipe(file.stream)
        await Drive.disk('s3').put('photo/' + photoName, transform)
        filesName.photos.push({filename: photoName})
      })
    }

    let fields = {}
    request.multipart.field(async (name, value) => {
      fields[name] = value
    })

    await request.multipart.process()

    const created = await Product.create({
      category_id: fields.category_id,
      subcategory_id: fields.subcategory_id,
      type_id: fields.type_id,
      brand_id: fields.brand_id,
      uid: shortid.generate(),
      name: fields.name,
      price: fields.price,
      choice: fields.choice,
      thumbnail: filesName.thumbnail
    })

    if (filesName.photos.length) {
      await created.photos().createMany(filesName.photos)
    }

    response.send(fields)
  }

  async update ({request, response}) {

    return await Database.table( 'homestead.' + 'products').where('id', params.id)

  }

  async destroy ({request, response, params}) {
    const product = Product.find(params.id).fetch()

    //const product = await Database.table( request.post().database + 'products').where('uid', params.id)

    return
  }

}

module.exports = ProductCrudController
