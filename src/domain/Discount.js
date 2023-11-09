import { DISCOUNT_AMOUNT, PERIOD } from '../constant.js';

class Discount {
  #amount;

  constructor() {
    this.#amount = 0;
  }

  apply(purchaseList, day) {
    this.#applyChristmasEvent(day);
    this.#applyWeekDayEvent(purchaseList);
    this.#applyWeekendEvent(purchaseList);
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

  #applyWeekendEvent(purchaseList) {
    const mainCount = purchaseList.main.reduce((sum, cnt) => sum + cnt, 0);
    if (mainCount > 0) {
      this.#amount += DISCOUNT_AMOUNT.week * mainCount;
    }
  }

  getAmount() {
    return this.#amount;
  }
}

export default Discount;
말;
