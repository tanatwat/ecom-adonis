'use strict'
const sharp = require('sharp')
const shortid = require('shortid')
const Database = use('Database')
const Helpers = use('Helpers')
const Drive = use('Drive')
const fs = require('fs')

class ProductCrudController {

  async editThumbnail ({request, response, params}) {
    var base64 = request.post().thumbnail
    var result = base64.split(',')

    let image = new Buffer(result[1], "base64");

    const thumbnailName = await shortid.generate() + '_TEXT.jpg'
    const data = await sharp(image)
      .resize(200,200, {
        kernel: sharp.kernel.nearest,
        quality: 70,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .jpeg({quality: 80})
      .toFormat('jpeg')

      await Drive.disk('s3').put('thumbnail/' + thumbnailName, data)

      await Drive.disk('s3').delete('thumbnail/' + request.post().fileToDelete)
      await Database.table(request.post().database + 'products').where('uid', params.uid).update({
        thumbnail: thumbnailName
      })

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

}

module.exports = ProductCrudController
