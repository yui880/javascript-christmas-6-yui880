import { MENU_CATEGORY } from '../constant/menu.js';

class Order {
  #menuList;

  constructor() {
    this.#initMenuList();
  }

  #initMenuList() {
    this.#menuList = Object.keys(MENU_CATEGORY).reduce((menuList, category) => {
      menuList[category] = 0;
      return menuList;
    }, {});
  }
}

export default Order;
