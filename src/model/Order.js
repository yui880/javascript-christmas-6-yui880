import { CATEGORY, CATEGORY_NAME, MENU_NAME } from '../constant/menu.js';

class Order {
  #menuList;

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
          this.#menuList[category] += 1;
        }
      });
    });
  }
}

export default Order;
