import Discount from './Discount.js';
import Gift from './Gift.js';
import { BADGE, COUNT_UNIT } from '../constant.js';

class Promotion {
  #discount;

  #gift;

  constructor(discount = new Discount(), gift = new Gift()) {
    this.#discount = discount;
    this.#gift = gift;
  }

  conductEvent(product, day) {
    this.#discount.apply(product, day);
    this.#gift.apply(product);
  }

  isEmpty() {
    return this.#gift.isEmpty() && this.#discount.isEmpty();
  }

  getEventBenefitList() {
    const discountAmountList = this.#discount.getAmountByEvent();
    const giftAmount = this.#gift.getAmount();

    return [...discountAmountList, giftAmount];
  }

  getGiftCount() {
    return this.#gift.getCount();
  }

  getTotalBenefitAmount() {
    return this.#discount.getAmount() + this.#gift.getAmount();
  }

  getTotalDiscountAmount() {
    return this.#discount.getAmount();
  }

  getBadge() {
    const totalBenefit = this.getTotalBenefitAmount();

    if (totalBenefit >= BADGE.santa.amount) return BADGE.santa.name;
    if (totalBenefit >= BADGE.tree.amount) return BADGE.tree.name;
    if (totalBenefit >= BADGE.star.amount) return BADGE.star.name;
    return COUNT_UNIT.empty;
  }
}

export default Promotion;
