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
    if (order.isTotalPriceLessThan(EVENT_PRICE.minimumForGift)) return;

    this.#amount += GIFT_ITEM.price;
    this.#count += 1;
  }

  getAmount() {
    return this.#amount;
  }

  getCount() {
    return this.#count;
  }
}

export default GiftEvent;
