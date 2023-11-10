import Product from './domain/Product.js';
import Promotion from './domain/Promotion.js';
import OutputView from './OutputView.js';

class EventPlaner {
  #product;

  #promotion;

  constructor() {
    this.#product = new Product();
    this.#promotion = new Promotion();
  }

  async handleException(callback) {
    try {
      return await callback();
    } catch (error) {
      OutputView.printError(error.message);

      return this.handleException(callback);
    }
  }
}

export default EventPlaner;
