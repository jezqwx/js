import { SETTINGS } from "./config.mjs";

export class Product {
  #id;
  #title;
  #price;

  constructor(id, title, price) {
    this.#id = id;
    this.#title = title;
    this.#price = price;
  }

  get price() {
    return this.#price;
  }

  get title() {
    return this.#title;
  }
}

export class Cart {
  #items;

  constructor() {
    this.#items = [];
  }

  add(product, quantity) {
    this.#items.push({ product, quantity });
  }

  getSubtotal() {
    return this.#items.reduce(
      (acc, current) => acc + current.product.price * current.quantity,
      0
    );
  }

  getTax() {
    return this.getSubtotal() * SETTINGS.taxRate;
  }

  getTotal() {
    return this.getSubtotal() + this.getTax();
  }
}