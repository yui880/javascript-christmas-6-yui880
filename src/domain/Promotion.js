import Discount from './Discount.js';
import Gift from './Gift.js';

class Promotion {
  #discount;

  #gift;

  constructor() {
    this.#discount = new Discount();
    this.#gift = new Gift();
  }

  conductEvent(product, day) {
    this.#discount.apply(product.getAmount(), product.getQuantity(), day);
    this.#gift.apply(product.getAmount());
  }

  getTotalDiscountAmount() {
    const discountAmount = this.#discount.getAmount();
    const giftAmount = this.#gift.getAmount();
    return { discountAmount, giftAmount };
  }
}

export default Promotion;
