import { CATEGORY, MENU_NAME, MENU_PRICE } from '../constant.js';
import Validator from '../Validator.js';

class Product {
  #price;

  #quantity = {};

  constructor(menu) {
    this.#price = 0;
    Validator.validateMenu(menu);

    this.#initQuantity();
    this.purchase(menu);
  }

  #initQuantity() {
    CATEGORY.forEach((categoryName) => {
      this.#quantity[categoryName] = new Array(MENU_NAME[categoryName].length).fill(0);
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
      this.#price += MENU_PRICE[category][index] * Number(count);
    }
  }

  isPriceGreaterThan(number) {
    return this.#price > number;
  }

  getQuantity() {
    return this.#quantity;
  }

  getPrice() {
    return this.#price;
  }
}

export default Product;
