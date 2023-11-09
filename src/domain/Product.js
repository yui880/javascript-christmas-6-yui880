import { APPETIZER_NAME, MENU, MENU_NAME } from '../constant.js';

class Product {
  #quantity = {};

  constructor() {
    Object.keys(MENU).forEach((menu) => {
      this.#quantity[menu] = new Array(MENU[menu].length);
    });
  }

  purchase(orderedItem) {}

  getQuantity() {
    return this.#quantity;
  }
}

export default Product;
