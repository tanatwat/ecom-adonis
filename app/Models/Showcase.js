"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Showcase extends Model {
  getProducts(products) {
    if (products) {
      return JSON.parse(products);
    } else {
      return [];
    }
  }
}

module.exports = Showcase;
