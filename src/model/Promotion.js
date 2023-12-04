import DiscountEvent from './DiscountEvent.js';
import GiftEvent from './GiftEvent.js';
import { EVENT_PRICE } from '../constant/event.js';

class Promotion {
  #discountEvent;

  #giftEvent;

  constructor(discountEvent = new DiscountEvent(), giftEvent = new GiftEvent()) {
    this.#discountEvent = discountEvent;
    this.#giftEvent = giftEvent;
  }

  conductEvent({ visitDate, order }) {
    if (order.isTotalPriceLessThan(EVENT_PRICE.eventLimit)) return;

    this.#discountEvent.apply({ visitDate, order });
    this.#giftEvent.apply(order);
  }
}

export default Promotion;
