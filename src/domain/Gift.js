import { DISCOUNT_STANDARD, GIFT_ITEM } from '../constant.js';

class Gift {
  #count;

  #amount;

  constructor() {
    this.#count = 0;
    this.#amount = 0;
  }

  apply(product) {
    if (product.isPriceGreaterThan(DISCOUNT_STANDARD.minimumForGift)) {
      this.#amount += GIFT_ITEM.price;
      this.#count += 1;
    }
  }

  getCount() {
    return this.#count;
  }

  getAmount() {
    return this.#amount;
  }
}

export default Gift;
