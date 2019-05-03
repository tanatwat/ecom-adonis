"use strict";

const sharp = require("sharp");
const shortid = require("shortid");
const Drive = use("Drive");
const Product = use("App/Models/Product");
const ProductImage = use("App/Models/ProductImage");

class ProductCrudController {
  async store({ request, response }) {
    let filesName = {
      thumbnail: null,
      photos: []
    };
    request.multipart.file("thumbnail", {}, async file => {
      const thumbnailName = shortid.generate();
      const data = await sharp()
        .resize(200, 200, {
          kernel: sharp.kernel.nearest,
          quality: 70,
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .jpeg({ quality: 80 })
        .toFormat("jpeg");
      file.stream.pipe(data);
      await Drive.disk("s3").put("thumbnail/" + thumbnailName + ".jpg", data);
      filesName.thumbnail = thumbnailName;
    });

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
          .jpeg({ quality: 90 })
          .toFormat("jpeg");
        file.stream.pipe(transform);
        await Drive.disk("s3").put("photo/" + photoName, transform);
        //If using product images model use commented function below
        //filesName.photos.push({ filename: photoName });

        filesName.photos.push(photoName);
      });
    }

    let fields = {};
    request.multipart.field(async (name, value) => {
      fields[name] = value;
    });

    await request.multipart.process();

    const created = await Product.create({
      client_id: fields.client_id,
      category_id: fields.category_id,
      subcategory_id: fields.subcategory_id,
      type_id: fields.type_id,
      brand_id: fields.brand_id,
      uid: filesName.thumbnail,
      name: fields.name,
      price: fields.price,
      choice: fields.choice,
      thumbnail: filesName.thumbnail + ".jpg",
      photos: JSON.stringify(filesName.photos)
    });

    //If using product images model use commented function below

    // if (filesName.photos.length) {
    //   await filesName.photos.map(function(val) {
    //     val.product_id = created.uid;
    //   });

    //   await ProductImage.createMany(filesName.photos);
    // }

    response.send("success");
  }

  async destroy({ request, params }) {
    const product = await Product.find(params.id);
    const parsed = product.toJSON();

    await Drive.disk("s3").delete("thumbnail/" + product.thumbnail);

    if (parsed.photos.length >= 1) {
      for (const val of parsed.photos) {   
        await Drive.disk("s3").delete("photo/" + val);
      }
    }

    if (product.client_id == request.header("Client")) {
      await product.delete();
    }
  }
}

module.exports = ProductCrudController;
