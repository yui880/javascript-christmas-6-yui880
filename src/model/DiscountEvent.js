import { DISCOUNT_NAME } from '../constant/event.js';

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
  }

  #applyChristmasEvent(visitDate) {
    if (visitDate.isChristmasDay()) {
      this.#amountList.christmas = visitDate.getChristmasDiscountAmount();
    }
  }

  #applyWeekdayEvent(visitDate, dessertCount) {
    if (visitDate.isWeekday()) {
      this.#amountList.weekday = EVENT_PRICE.weekday * dessertCount;
    }
  }

  getAmountList() {
    return this.#amountList;
  }
}

export default DiscountEvent;
