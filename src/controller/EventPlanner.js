import Product from '../domain/Product.js';
import Promotion from '../domain/Promotion.js';
import OutputView from '../view/OutputView.js';
import InputView from '../view/InputView.js';
import Day from '../domain/Day.js';

class EventPlanner {
  #day;

  #product;

  #promotion;

  constructor(promotion = new Promotion()) {
    this.#promotion = promotion;
  }

  async run() {
    OutputView.printDescription();
    const visitDate = await this.handleException(() => this.#getVisitDate());
    const menu = await this.handleException(() => this.#getMenu());

    this.#printBeforeEvent(visitDate, menu);
    this.#promotion.conductEvent(this.#product, this.#day);
    this.#printAfterEvent();
  }

  #printBeforeEvent(visitDate, menu) {
    OutputView.printPreviewMessage(visitDate);
    OutputView.printMenu(menu);
    OutputView.printTotalAmount(this.#product.getTotalPrice());
  }

  #printAfterEvent() {
    OutputView.printGift(this.#promotion.getGiftCount());
    OutputView.printDiscountList(this.#promotion.isEmpty(), this.#promotion.getEventBenefitList());

    OutputView.printTotalBenefit(this.#promotion.getTotalBenefitAmount());
    OutputView.printAfterDiscount(
      this.#product.getTotalPrice() - this.#promotion.getTotalDiscountAmount(),
    );
    OutputView.printBadge(this.#promotion.getBadge());
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

    this.#day = new Day(visitDate);
    return visitDate;
  }

  async #getMenu() {
    const menu = await InputView.readMenu();
    const splitMenu = this.#splitMenuList(menu);

    this.#product = new Product(splitMenu);
    return splitMenu;
  }

  #splitMenuList(menuList) {
    return menuList.split(',').map((menu) => menu.split('-').map((item) => item.trim()));
  }
}

export default EventPlanner;
