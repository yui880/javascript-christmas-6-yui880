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
}

export default DiscountEvent;
