'use strict'

const sharp = require('sharp')
const shortid = require('shortid')
const Helpers = use('Helpers')
const Drive = use('Drive')
const Database = use('Database')
const Product = use('App/Models/Product')
const ProductImage = use('App/Models/ProductImage')
const fs = use('fs')

class ProductCrudController {

  async get ({request, response}) {
    const products = await Product.query()
    .ownerIs(request.header('Client'))
    .filter(request.all())
    .paginate(request.get().page, 30)

    response.send(products)
  }

  async store ({request, response}) {
    let filesName = {
      thumbnail: null,
      photos: []
    }
    request.multipart.file('thumbnail', {}, async file => {
      const thumbnailName = shortid.generate() + '.jpg'
      const data = await sharp()
        .resize(200,200, {
          kernel: sharp.kernel.nearest,
          quality: 70,
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .jpeg({quality: 80})
        .toFormat('jpeg')
        file.stream.pipe(data)
        await Drive.disk('s3').put('thumbnail/' + thumbnailName, data)
        filesName.thumbnail = thumbnailName
    })

    for (let i = 0; i < 7; i++) {
    request.multipart.file('files[' + i + ']', {}, async file => {
        let photoName = shortid.generate() + '.jpg'
        let transform = await sharp()
          .resize(400,400, {
            kernel: sharp.kernel.nearest,
            quality: 70,
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          })
          .jpeg({quality: 90})
          .toFormat('jpeg')
        file.stream.pipe(transform)
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
      client_id: fields.client_id,
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
    
      await filesName.photos.map(function(val) { 
        val.product_id = created.uid; 
      })

      await ProductImage.createMany(filesName.photos)
      
    }

    response.send('success')
  }

  async destroy ({request, params}) {

    const product = await Product.find(params.id)
    const photos = await product.photos().fetch()
    const photosJSON = photos.toJSON()

    await Drive.disk('s3').delete('thumbnail/' + product.thumbnail)

    if (photosJSON.length) {
      for (const val in photosJSON) {
        await Drive.disk('s3').delete('photo/' + photosJSON[val].filename)
      }
    }

    if (product.client_id == request.header('Client')) {
      await product.delete()
    }

  }

  backup() {
/*     let filesName = {
      thumbnail: null,
      photos: []
    }
    request.multipart.file('thumbnail', {}, async file => {
      const thumbnailName = shortid.generate() + '.jpg'
      let resized = sharp()
        .resize(200,200, {
          kernel: sharp.kernel.nearest,
          quality: 70,
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .jpeg({quality: 80})
        .toFormat('jpeg')
        file.stream.pipe(resized).pipe(file.stream)
        await Drive.disk('s3').put('thumbnail/' + thumbnailName, resized)
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
        Drive.disk('s3').put('photo/' + photoName, transform)
        filesName.photos.push({filename: photoName})
      })
    }

    let fields = {}
    request.multipart.field(async (name, value) => {
      fields[name] = value
    })

    await request.multipart.process()

    const uid = shortid.generate()
    await Product.create({
      client_id: fields.client_id,
      category_id: fields.category_id,
      subcategory_id: fields.subcategory_id,
      type_id: fields.type_id,
      brand_id: fields.brand_id,
      uid: uid,
      name: fields.name,
      price: fields.price,
      choice: fields.choice,
      thumbnail: filesName.thumbnail
    })

    if (filesName.photos.length) {
      const target = await Product.find(uid)
      await target.photos().createMany(filesName.photos)
    } */
  }

}

module.exports = ProductCrudController
