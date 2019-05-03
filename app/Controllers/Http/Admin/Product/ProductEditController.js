"use strict";
const sharp = require("sharp");
const shortid = require("shortid");
const Product = use("App/Models/Product");
const Database = use("Database");
const Helpers = use("Helpers");
const Drive = use("Drive");
const fs = require("fs");

class ProductCrudController {
  async editThumbnail({ request, params }) {
    var base64 = request.post().thumbnail;
    var result = base64.split(",");

    let image = new Buffer(result[1], "base64");

    const thumbnailName = request.post().fileToDelete;
    const data = await sharp(image)
      .resize(200, 200, {
        kernel: sharp.kernel.nearest,
        quality: 80,
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFormat("jpeg");

    await Drive.disk("s3").delete("thumbnail/" + thumbnailName);
    await Drive.disk("s3").put("thumbnail/" + thumbnailName, data);
  }

  async editInfo({ request, params }) {
    return await Database.table("products")
      .where("uid", params.uid)
      .update({
        name: request.post().name,
        price: request.post().price
      });
  }

  async editCategory({ request, params }) {
    return await Database.table("products")
      .where("uid", params.uid)
      .update({
        category_id: request.post().category,
        subcategory_id: request.post().subcategory,
        type_id: request.post().type
      });
  }

  async editBrand({ request, params }) {
    return await Database.table("products")
      .where("uid", params.uid)
      .update({
        brand_id: request.post().brand
      });
  }

  async editChoice({ request, params }) {
    return await Database.table("products")
      .where("uid", params.uid)
      .update({
        choice: request.post().choice
      });
  }

  async uploadPhoto({ request, response, params }) {
    let photos = [];
    const filesCount = request.header("FilesCount");

    for (let i = 0; i < filesCount; i++) {
      request.multipart.file("files[" + i + "]", {}, async file => {
        let photoName = shortid.generate() + ".jpg";
        let transform = await sharp()
          .resize(400, 400, {
            kernel: sharp.kernel.nearest,
            quality: 70,
            fit: "contain",
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          })
          .jpeg()
          .toFormat("jpeg");
        file.stream.pipe(transform);
        await Drive.disk("s3").put("photo/" + photoName, transform);
        photos.push(photoName);
      });
    }

    let fields = {};
    request.multipart.field(async (name, value) => {
      fields[name] = value;
    });

    await request.multipart.process();

    let converted = fields.photos.split(",");
    const filesList = photos.concat(converted);

    await Database.table("products")
      .where("client_id", request.header("Client"))
      .where("uid", params.uid)
      .update({
        photos: JSON.stringify(filesList)
      });

    response.send(photos);
  }

  async deletePhoto({ request, params }) {
    await Promise.all([
      Drive.disk("s3").delete("photo/" + request.post().photo),
      Database.table("products")
        .where("client_id", request.header("Client"))
        .where("uid", params.uid)
        .update({
          photos: JSON.stringify(request.post().files)
        })
    ]);
  }

  async updateStock({ request, params }) {
    await Database.table("products")
      .where("uid", params.uid)
      .where("client_id", request.header("Client"))
      .update({
        stock: request.post().qty
      });
  }
}

module.exports = ProductCrudController;
