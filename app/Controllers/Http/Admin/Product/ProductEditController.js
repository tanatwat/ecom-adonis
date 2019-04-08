'use strict'
const sharp = require('sharp')
const shortid = require('shortid')
const Product = use('App/Models/Product')
const Database = use('Database')
const Helpers = use('Helpers')
const Drive = use('Drive')
const fs = require('fs')

class ProductCrudController {

  async editThumbnail ({request, response, params}) {
    var base64 = request.post().thumbnail
    var result = base64.split(',')

    let image = new Buffer(result[1], "base64");

    const thumbnailName = await shortid.generate() + '.jpg'
    const data = await sharp(image)
      .resize(200,200, {
        kernel: sharp.kernel.nearest,
        quality: 70,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .jpeg({quality: 80})
      .toFormat('jpeg')

      await Promise.all([
        Drive.disk('s3').put('thumbnail/' + thumbnailName, data),
        Drive.disk('s3').delete('thumbnail/' + request.post().fileToDelete),
        Database.table(request.post().database + 'products').where('uid', params.uid).update({
          thumbnail: thumbnailName
        })
      ])
  }

  async editInfo ({request, response, params}) {

    return await Database.table(request.post().database + 'products').where('uid', params.uid).update({
      name: request.post().name,
      price: request.post().price
    })

  }

  async editCategory ({request, response, params}) {

    return await Database.table( request.post().database + 'products').where('uid', params.uid).update({
      category_id: request.post().category,
      subcategory_id: request.post().subcategory,
      type_id: request.post().type,
    })

  }

  async editBrand ({request, response, params}) {
    return await Database.table( request.post().database + 'products').where('uid', params.uid).update({
      brand_id: request.post().brand,
    })
  }

  async editChoice ({request, response, params}) {
    return await Database.table( request.post().database + 'products').where('uid', params.uid).update({
      choice: request.post().choice,
    })
  }

  async uploadPhoto ({request, response, params}) {
    let photos = []
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
          .jpeg()
          .toFormat('jpeg')
        file.stream.pipe(transform).pipe(file.stream)
        await Drive.disk('s3').put('photo/' + photoName, transform)
        photos.push({filename: photoName})
      })
    }

    await request.multipart.process()

    const product = await Product.find(params.uid)
    await product.photos().createMany(photos)

    response.send(photos)
  }

  async deletePhoto ({request, response, params}) {
    await Promise.all([
      Drive.disk('s3').delete('photo/' + request.post().photo),
      Database.table( request.post().database + 'product_images').where('filename', request.post().photo).delete()
    ])
  }
}

module.exports = ProductCrudController
