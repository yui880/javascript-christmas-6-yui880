import Product from './domain/Product.js';
import Promotion from './domain/Promotion.js';
import OutputView from './OutputView.js';
import InputView from './InputView.js';
import Validator from './Validator.js';

class EventPlanner {
  #product;

  #promotion;

  constructor() {
    this.#promotion = new Promotion();
  }

  async run() {
    OutputView.printDescription();
    const visitDate = await this.handleException(() => this.#getVisitDate());
    const menu = await this.handleException(() => this.#getMenu());
    OutputView.printPreviewMessage(visitDate);
    OutputView.printMenu(menu);

    OutputView.printTotalAmount(this.#product.getPrice());
    this.#promotion.conductEvent(this.#product, visitDate);

    this.#printEventResult();
  }

  #printEventResult() {
    const { discountList, giftAmount } = this.#promotion.getEventResult();
    OutputView.printGift(giftAmount);
    OutputView.printDiscountList(discountList, giftAmount);

    const discountAmount = this.#promotion.getTotalDiscountAmount();
    OutputView.printTotalDiscount(discountAmount + giftAmount);
    OutputView.printAfterDiscount(this.#product.getPrice() - discountAmount);

    const badge = this.#promotion.getBadge();
    OutputView.printBadge(badge);
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
    Validator.validateDate(visitDate);

    return visitDate;
  }

  async #getMenu() {
    const menu = await InputView.readMenu();
    const splitMenu = this.#getSplitMenu(menu);

    this.#product = new Product(splitMenu);
    return splitMenu;
  }

  #getSplitMenu(menuList) {
    return menuList.split(',').map((menu) => menu.split('-').map((item) => item.trim()));
  }
}

export default EventPlanner;
