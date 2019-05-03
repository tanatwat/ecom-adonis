"use strict";

const Database = use("Database");
const Showcase = use("App/Models/Showcase");

class ShowcaseController {
  async index({ request }) {
    return await Showcase.query()
      .where("client_id", request.header("Client"))
      .fetch();
  }

  async store({ request }) {
    const created = await Database.table("showcases").insert({
      client_id: request.header("Client"),
      name: request.post().name
    });

    return { id: created[0], products: [] };
  }

  async destroy({ request, params }) {
    await Database.table("showcases")
      .where("client_id", request.header("Client"))
      .where("id", params.id)
      .del();

    return "success";
  }

  async show({ request, params }) {
    let showcase = await Showcase.query()
      .where("client_id", request.header("Client"))
      .where("id", params.id)
      .fetch();
    showcase = showcase.toJSON();
    const productsList = showcase[0].products;

    if (productsList.length) {
      var products = await Database.table("products").whereIn(
        "id",
        productsList
      );
    } else {
      var products = [];
    }

    return { showcase, products };
  }

  async removeFromShowcase({ request, params }) {
    return await Database.table("showcases")
      .where("client_id", request.header("Client"))
      .where("id", params.id)
      .update({
        products: request.post().products
      });
  }

  async updateName({ request, params }) {
    return await Database.table("showcases")
      .where("client_id", request.header("Client"))
      .where("id", params.id)
      .update({
        name: request.post().name
      });
  }
}

module.exports = ShowcaseController;
