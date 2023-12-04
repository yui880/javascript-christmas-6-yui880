import InputView from '../view/InputView.js';
import VisitDate from '../model/VisitDate.js';
import { SEPARATOR } from '../constant/constant.js';
import Order from '../model/Order.js';
import OutputView from '../view/OutputView.js';
import Promotion from '../model/Promotion.js';

class EventPlannerController {
  #visitDate;

  #order;

  #promotion;

  constructor(promotion = new Promotion()) {
    this.#promotion = promotion;
  }

  async play() {
    OutputView.printWelcome();
    const day = await this.#getVisitDay();
    const menuList = await this.#getMenuList();

    this.#printBeforeEvent(day, menuList);
    this.#promotion.conductEvent({
      visitDate: this.#visitDate,
      order: this.#order,
    });
    this.#printAfterEvent();
  }

  #printBeforeEvent(day, menuList) {
    OutputView.printPreviewMessage(day);
    OutputView.printMenuList(menuList);
    OutputView.printBeforeDiscountPrice(this.#order.getTotalPrice());
  }

  #printAfterEvent() {
    OutputView.printGiftMenu(this.#promotion.getGiftCount());
    OutputView.printBenefitList(this.#promotion.getBenefitList());
    OutputView.printTotalBenefitPrice(this.#promotion.getTotalBenefitAmount());
    OutputView.printAfterDiscountPrice(
      this.#promotion.getExpectedPayment(this.#order.getTotalPrice()),
    );
  }

  async #getVisitDay() {
    const visitDate = await InputView.readVisitDate();
    this.#visitDate = new VisitDate(visitDate);

    return visitDate;
  }

  async #getMenuList() {
    const menus = await InputView.readMenus();
    const menuList = this.#splitMenu(menus);
    this.#order = new Order(menuList);

    return menuList;
  }

  #splitMenu(menus) {
    return menus
      .split(SEPARATOR.item)
      .map((menu) => menu.split(SEPARATOR.count))
      .map(([name, count]) => [name.trim(), Number(count)]);
  }
}

export default EventPlannerController;
