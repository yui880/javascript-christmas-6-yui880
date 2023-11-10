import { DISCOUNT_STANDARD, GIFT_ITEM } from '../constant.js';

class Gift {
  #amount;

  constructor() {
    this.#amount = 0;
  }

  apply(totalAmount) {
    if (totalAmount >= DISCOUNT_STANDARD.minimumForGift) {
      this.#amount += GIFT_ITEM.price;
    }
  }

  getAmount() {
    return this.#amount;
  }
}

export default Gift;
