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
  }

  #applyChristmasEvent(visitDate) {
    if (visitDate.isChristmasDay()) {
      this.#amountList.christmas = visitDate.getChristmasDiscountAmount();
    }
  }
}

export default DiscountEvent;
