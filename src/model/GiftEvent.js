import { EVENT_PRICE } from '../constant/event.js';
import { GIFT_ITEM } from '../constant/menu.js';

class GiftEvent {
  #count;

  #amount;

  constructor() {
    this.#amount = 0;
    this.#count = 0;
  }

  apply(order) {
    if (!order.isTotalPriceLessThan(EVENT_PRICE.minimumForGift)) {
      this.#amount = GIFT_ITEM.price;
      this.count += 1;
    }
  }

  getAmount() {
    return this.#amount;
  }
}

export default GiftEvent;
