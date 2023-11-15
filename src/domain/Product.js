import { CATEGORY, MENU_NAME, MENU_PRICE } from '../constants/menu.js';
import Validator from '../validator/Validator.js';

class Product {
  #price = 0;

  #quantity = {};

  constructor(menu) {
    this.#validateMenu(menu);
    this.#initQuantity();
    this.purchase(menu);
  }

  #initQuantity() {
    CATEGORY.forEach((categoryName) => {
      this.#quantity[categoryName] = new Array(MENU_NAME[categoryName].length).fill(0);
    });
  }

  #validateMenu(menu) {
    Validator.validateMenu(menu);
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
      this.#price += MENU_PRICE[category][index] * Number(count);
    }
  }

  getCountByCategory(category) {
    return this.#quantity[category].reduce((sum, cnt) => sum + cnt, 0);
  }

  isPriceLessThan(number) {
    return this.#price < number;
  }

  getTotalPrice() {
    return this.#price;
  }
}

export default Product;
