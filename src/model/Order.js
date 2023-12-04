import { CATEGORY, CATEGORY_NAME, MENU_NAME, MENU_PRICE } from '../constant/menu.js';
import Validator from '../validator/Validator.js';
import { ERROR } from '../constant/message.js';

class Order {
  #menuList;

  #totalPrice = 0;

  constructor(menu) {
    this.#validateMenu(menu);
    this.#initMenuList();
    this.#countMenuByCategory(menu);
    this.#calculateTotalPrice(menu);
  }

  #validateMenu(menu) {
    Validator.checkIsEmpty(menu, ERROR.menu);
    Validator.checkNamesInMenu(menu);
    Validator.checkCountsInRange(menu);
    Validator.checkTotalCountInRange(menu);
    Validator.checkHasDuplicate(menu);
    Validator.checkHasDrinkOnly(menu);
  }

  #initMenuList() {
    this.#menuList = Object.keys(CATEGORY).reduce((menuList, category) => {
      menuList[category] = 0;
      return menuList;
    }, {});
  }

  #countMenuByCategory(menu) {
    menu.forEach(([name, count]) => {
      CATEGORY_NAME.forEach((category) => {
        if (MENU_NAME[category].includes(name)) {
          this.#menuList[category] += Number(count);
        }
      });
    });
  }

  #calculateTotalPrice(menu) {
    menu.forEach(([name, count]) => {
      CATEGORY_NAME.forEach((category) => {
        const menuIndex = MENU_NAME[category].indexOf(name);

        if (menuIndex >= 0) {
          this.#totalPrice += MENU_PRICE[category][menuIndex] * count;
        }
      });
    });
  }

  getCountByCategory(category) {
    return this.#menuList[category];
  }

  isTotalPriceLessThan(number) {
    return this.#totalPrice < number;
  }

  getMenuList() {
    return this.#menuList;
  }

  getTotalPrice() {
    return this.#totalPrice;
  }
}

export default Order;
