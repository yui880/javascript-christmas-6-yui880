import Discount from './Discount.js';
import Gift from './Gift.js';

class Promotion {
  #discount;

  #gift;

  constructor() {
    this.#discount = new Discount();
    this.#gift = new Gift();
  }
}

export default Promotion;
