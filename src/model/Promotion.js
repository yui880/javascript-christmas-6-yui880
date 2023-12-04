import DiscountEvent from './DiscountEvent.js';
import GiftEvent from './GiftEvent.js';
import { BADGE, EVENT_PRICE } from '../constant/event.js';

class Promotion {
  #discountEvent;

  #giftEvent;

  constructor(discountEvent = new DiscountEvent(), giftEvent = new GiftEvent()) {
    this.#discountEvent = discountEvent;
    this.#giftEvent = giftEvent;
  }

  conductEvent({ visitDate, order }) {
    if (order.isTotalPriceLessThan(EVENT_PRICE.minimumForEvent)) return;

    this.#discountEvent.apply({ visitDate, order });
    this.#giftEvent.apply(order);
  }

  getBadge() {
    const totalBenefit = this.getTotalBenefitAmount();

    if (totalBenefit < BADGE.star.price) return BADGE.empty.name;
    if (totalBenefit < BADGE.tree.price) return BADGE.star.name;
    if (totalBenefit < BADGE.santa.price) return BADGE.tree.name;
    return BADGE.santa.name;
  }

  getGiftCount() {
    return this.#giftEvent.getCount();
  }

  getTotalBenefitAmount() {
    return this.#discountEvent.getTotalAmount() + this.#giftEvent.getAmount();
  }

  getExpectedPayment(totalPrice) {
    return totalPrice - this.#discountEvent.getTotalAmount();
  }
}

export default Promotion;
