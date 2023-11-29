import { DISCOUNT_STANDARD } from '../constants/constant.js';
import { GIFT_ITEM } from '../constants/menu.js';

class Gift {
  #count;

  #amount;

  constructor() {
    this.#count = 0;
    this.#amount = 0;
  }

  apply(product) {
    if (product.isPriceLessThan(DISCOUNT_STANDARD.minimumForGift)) return;

    this.#amount += GIFT_ITEM.price;
    this.#count += 1;
  }

  isEmpty() {
    return this.#amount === 0;
  }

  getCount() {
    return this.#count;
  }

  getAmount() {
    return this.#amount;
  }
}

export default Gift;
