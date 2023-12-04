import { DISCOUNT_NAME, EVENT_PRICE } from '../constant/event.js';
import { CATEGORY } from '../constant/menu.js';

class DiscountEvent {
  #amountList;

  constructor() {
    this.#initAmountList();
  }

  #initAmountList() {
    this.#amountList = DISCOUNT_NAME.reduce((amountList, event) => {
      amountList[event] = 0;
      return amountList;
    }, {});
  }

  apply({ visitDate, order }) {
    this.#applyChristmasEvent(visitDate);
    this.#applyWeekdayEvent(visitDate, order.getCountByCategory(CATEGORY.dessert));
    this.#applyWeekendEvent(visitDate, order.getCountByCategory(CATEGORY.main));
    this.#applySpecialEvent(visitDate);
  }

  #applyChristmasEvent(visitDate) {
    if (visitDate.isChristmasDay()) {
      this.#amountList.christmas += visitDate.getChristmasDiscountAmount();
    }
  }

  #applyWeekdayEvent(visitDate, dessertCount) {
    if (visitDate.isWeekday()) {
      this.#amountList.weekday += EVENT_PRICE.weekday * dessertCount;
    }
  }

  #applyWeekendEvent(visitDate, mainCount) {
    if (visitDate.isWeekend()) {
      this.#amountList.weekend += EVENT_PRICE.weekend * mainCount;
    }
  }

  #applySpecialEvent(visitDate) {
    if (visitDate.isSpecialDay()) {
      this.#amountList.special += EVENT_PRICE.special;
    }
  }

  getAmountList() {
    return this.#amountList;
  }

  getTotalAmount() {
    return Object.values(this.#amountList).reduce((sum, amount) => sum + amount, 0);
  }
}

export default DiscountEvent;
