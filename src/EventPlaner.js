import Product from './domain/Product.js';
import Promotion from './domain/Promotion.js';

class EventPlaner {
  #product;

  #promotion;

  constructor() {
    this.#product = new Product();
    this.#promotion = new Promotion();
  }
}
