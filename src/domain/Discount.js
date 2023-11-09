import { DISCOUNT_AMOUNT, PERIOD } from '../constant.js';

class Discount {
  #amount;

  constructor() {
    this.#amount = 0;
  }

  apply(purchaseList, day) {
    this.#applyChristmasEvent(day);
    this.#applyWeekDayEvent(purchaseList);
  }

  #applyChristmasEvent(day) {
    if (day >= PERIOD.christmas.start && day <= PERIOD.christmas.end) {
      this.#amount += DISCOUNT_AMOUNT.base + DISCOUNT_AMOUNT.addition * (day - 1);
    }
  }

  #applyWeekDayEvent(purchaseList) {
    const dessertCount = purchaseList.dessert.reduce((sum, cnt) => sum + cnt, 0);
    if (dessertCount > 0) {
      this.#amount += DISCOUNT_AMOUNT.week * dessertCount;
    }
  }

  getAmount() {
    return this.#amount;
  }
}

export default Discount;
