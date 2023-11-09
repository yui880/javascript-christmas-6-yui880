import { MONEY, PERIOD } from '../constant.js';

class Discount {
  #amount;

  constructor() {
    this.#amount = 0;
  }

  apply(purchaseAmount, day) {
    this.#applyChristmasEvent(day);
  }

  #applyChristmasEvent(day) {
    if (day >= PERIOD.christmas.start && day <= PERIOD.christmas.end) {
      this.#amount += MONEY.base + MONEY.addition * (day - 1);
    }
  }

  getAmount() {
    return this.#amount;
  }
}

export default Discount;
