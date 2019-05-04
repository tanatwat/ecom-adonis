"use strict";

const Database = use("Database");

class ShippingController {
  async store({ request }) {
    const { method, fee, multiply, promotion } = request.all();

    const created = await Database.table("shippings").insert({
      client_id: request.header("Client"),
      method: method,
      fee: fee,
      multiply: multiply,
      promotion: JSON.stringify(promotion)
    });

    return await Database.table("shippings").where("id", created);
  }

  async destroy({ request, params }) {
    return await Database.table("shippings")
      .where("client_id", request.header("Client"))
      .where("id", params.id)
      .del();
  }
}

module.exports = ShippingController;
