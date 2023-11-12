import { CATEGORY, MENU, MENU_NAME, MENU_PRICE } from '../constant.js';
import Validator from '../Validator.js';

class Product {
  #amount;

  #quantity = {};

  constructor(menu) {
    this.#amount = 0;
    Validator.validateMenu(menu);

    this.#initQuantity();
    this.purchase(menu);
  }

  #initQuantity() {
    Object.keys(MENU).forEach((menu) => {
      this.#quantity[menu] = new Array(MENU[menu].length).fill(0);
    });
  }

  purchase(orderedItem) {
    orderedItem.forEach(([name, count]) => {
      CATEGORY.forEach((categoryName) => {
        this.#countByCategory({ category: categoryName, name, count });
      });
    });
  }

  #countByCategory({ category, name, count }) {
    const index = MENU_NAME[category].indexOf(name);

    if (index >= 0) {
      this.#quantity[category][index] += Number(count);
      this.#amount += MENU_PRICE[category][index] * Number(count);
    }
  }

  getQuantity() {
    return this.#quantity;
  }

  getAmount() {
    return this.#amount;
  }
}

export default Product;
