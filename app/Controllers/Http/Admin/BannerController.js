"use strict";

const Database = use("Database");
const Drive = use("Drive");
const shortid = require("shortid");

class BannerController {
  async index({ request }) {
    const banners = await Database.table("banners").where(
      "client_id",
      request.header("Client")
    );
    return banners;
  }

  async store({ request }) {
    const filesCount = request.header("FilesCount");
    const client = request.header("Client");
    let files = [];
    for (let i = 0; i < filesCount; i++) {
      request.multipart.file("files[" + i + "]", {}, async file => {
        let fileName = `${client}_${shortid.generate()}.${file.subtype}`;
        await Drive.disk("s3").put("banners/" + fileName, file.stream);
        files.push(fileName);
      });
    }

    let fields = {};
    request.multipart.field(async (name, value) => {
      fields[name] = value;
    });

    await request.multipart.process();

    let converted = fields.banners.split(",");
    const filesList = files.concat(converted);

    await Database.table("banners")
      .where("client_id", client)
      .update({
        files: JSON.stringify(filesList)
      });

    return "success";
  }

  async destroy({ request }) {
    await Drive.disk('s3').delete('banners/' + request.post().banner )
    await Database.table("banners")
      .where("client_id", request.header("Client"))
      .update({
        files: JSON.stringify(request.post().files)
      });
   return request.post().banner
  }
}

module.exports = BannerController;
