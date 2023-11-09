import { Console } from '@woowacourse/mission-utils';
import { APPETIZER_NAME, DESSERT_NAME, DRINK_NAME, MAIN_NAME, MENU } from '../constant.js';

class Product {
  #quantity = {};

  constructor() {
    Object.keys(MENU).forEach((menu) => {
      this.#quantity[menu] = new Array(MENU[menu].length).fill(0);
    });
  }

  purchase(orderedItem) {
    orderedItem.forEach((item) => {
      this.#countAppetizer(item);
      this.#countMain(item);
      this.#countDessert(item);
      this.#countDrink(item);
    });
  }

  #countAppetizer([name, count]) {
    const index = APPETIZER_NAME.indexOf(name);
    if (index >= 0) {
      this.#quantity.appetizer[index] += count;
    }
  }

  #countMain([name, count]) {
    const index = MAIN_NAME.indexOf(name);
    if (index >= 0) {
      this.#quantity.main[index] += count;
    }
  }

  #countDessert([name, count]) {
    const index = DESSERT_NAME.indexOf(name);
    if (index >= 0) {
      this.#quantity.dessert[index] += count;
    }
  }

  #countDrink([name, count]) {
    const index = DRINK_NAME.indexOf(name);
    if (index >= 0) {
      this.#quantity.drink[index] += count;
    }
  }

  getQuantity() {
    return this.#quantity;
  }
}

const p = new Product();
p.purchase([['초코케이크', 2]]);
Console.print(p.getQuantity());

export default Product;
