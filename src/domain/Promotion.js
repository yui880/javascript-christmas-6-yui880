import Discount from './Discount.js';
import Gift from './Gift.js';
import { BADGE, COUNT_UNIT } from '../constant.js';

class Promotion {
  #discount;

  #gift;

  constructor() {
    this.#discount = new Discount();
    this.#gift = new Gift();
  }

  conductEvent(product, day) {
    this.#discount.apply(product.getPrice(), product.getQuantity(), day);
    this.#gift.apply(product);
  }

  getEventResult() {
    const discountList = this.#discount.getAmountList();
    const giftAmount = this.#gift.getAmount();

    return { discountList, giftAmount };
  }

  getTotalDiscountAmount() {
    return this.#discount.getAmount();
  }

  getBadge() {
    const totalBenefit = this.#discount.getAmount() + this.#gift.getAmount();

    if (totalBenefit >= BADGE.santa.amount) return BADGE.santa.name;
    if (totalBenefit >= BADGE.tree.amount) return BADGE.tree.name;
    if (totalBenefit >= BADGE.star.amount) return BADGE.star.name;
    return COUNT_UNIT.empty;
  }
}

export default Promotion;
