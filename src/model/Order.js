import { CATEGORY, CATEGORY_NAME, MENU, MENU_NAME, MENU_PRICE } from '../constant/menu.js';

class Order {
  #menuList;

  #totalPrice = 0;

  constructor(menu) {
    this.#initMenuList();
    this.#countMenuByCategory(menu);
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
          this.#menuList[category] += count;
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
}

export default Order;
