import Product from './domain/Product.js';
import Promotion from './domain/Promotion.js';
import OutputView from './OutputView.js';
import InputView from './InputView.js';

class EventPlanner {
  #product;

  #promotion;

  constructor() {
    this.#product = new Product();
    this.#promotion = new Promotion();
  }

  async run() {
    const visitDate = await this.handleException(() => this.#getVisitDate());
    const menu = await this.handleException(() => this.#getMenu());
    OutputView.printMenu(menu);

    this.#product.purchase(menu);
    OutputView.printTotalAmount(this.#product.getAmount());
    this.#promotion.conductEvent(this.#product, visitDate);

    this.#printEventResult();
  }

  #printEventResult() {
    const { discountList, giftAmount } = this.#promotion.getEventResult();
    OutputView.printGift(giftAmount);
    OutputView.printDiscountList(discountList, giftAmount);

    const discountAmount = this.#promotion.getTotalDiscountAmount();
    OutputView.printTotalDiscount(discountAmount + giftAmount);
    OutputView.printAfterDiscount(this.#product.getAmount() - discountAmount);
  }

  async handleException(callback) {
    try {
      return await callback();
    } catch (error) {
      OutputView.printError(error.message);

      return this.handleException(callback);
    }
  }

  async #getVisitDate() {
    const visitDate = await InputView.readDate();

    return visitDate;
  }

  async #getMenu() {
    const menu = await InputView.readMenu();

    return this.#getSplitMenu(menu);
  }

  #getSplitMenu(menuList) {
    return menuList.split(',').map((menu) => menu.split('-').map((item) => item.trim()));
  }
}

export default EventPlanner;
