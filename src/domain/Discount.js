import { DISCOUNT_STANDARD } from '../constants/constant.js';
import { DISCOUNT_EVENT } from '../constants/event.js';

class Discount {
  #amountList = {};

  constructor() {
    this.#initAmountList();
  }

  #initAmountList() {
    Object.keys(DISCOUNT_EVENT).forEach((eventName) => {
      this.#amountList[eventName] = 0;
    });
  }

  apply(product, day) {
    if (product.isPriceLessThan(DISCOUNT_STANDARD.minimum)) return;

    this.#applyChristmasEvent(day.isChristmasDay(), day.getChristmasDiscountAmount());
    this.#applyWeekdayEvent(product.getCountByCategory('dessert'), day.isWeekday());
    this.#applyWeekendEvent(product.getCountByCategory('main'), day.isWeekend());
    this.#applySpecialEvent(day.isSpecialDay());
  }

  #applyChristmasEvent(isChristmasDay, christmasDiscountAmount) {
    if (isChristmasDay) {
      this.#amountList.christmas += christmasDiscountAmount;
    }
  }

  #applyWeekdayEvent(dessertCount, isWeekday) {
    if (isWeekday && dessertCount > 0) {
      this.#amountList.weekday += DISCOUNT_STANDARD.week * dessertCount;
    }
  }

  #applyWeekendEvent(mainCount, isWeekend) {
    if (mainCount > 0 && isWeekend) {
      this.#amountList.weekend += DISCOUNT_STANDARD.week * mainCount;
    }
  }

  #applySpecialEvent(isSpecialDay) {
    if (isSpecialDay) {
      this.#amountList.special += DISCOUNT_STANDARD.base;
    }
  }

  isEmpty() {
    return this.getAmount() === 0;
  }

  getAmountByEvent() {
    return Object.values(this.#amountList);
  }

  getAmount() {
    return Object.values(this.#amountList).reduce((sum, item) => sum + item);
  }
}

export default Discount;
