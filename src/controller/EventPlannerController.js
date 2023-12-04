import InputView from '../view/InputView.js';
import VisitDate from '../model/VisitDate.js';
import { SEPARATOR } from '../constant/constant.js';
import Order from '../model/Order.js';
import OutputView from '../view/OutputView.js';

class EventPlannerController {
  #visitDate;

  #order;

  async play() {
    OutputView.printWelcome();
    const day = await this.#getVisitDay();
    const menuList = await this.#getMenuList();
    OutputView.printPreviewMessage(day);
    OutputView.printMenuList(menuList);
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
