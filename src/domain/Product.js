import { Console } from '@woowacourse/mission-utils';
import { MENU, MENU_NAME, MENU_PRIZE } from '../constant.js';

class Product {
  #amount;

  #quantity = {};

  constructor() {
    this.#amount = 0;

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
    const index = MENU_NAME.appetizer.indexOf(name);

    if (index >= 0) {
      this.#quantity.appetizer[index] += count;
      this.#amount += MENU_PRIZE.appetizer[index] * count;
    }
  }

  #countMain([name, count]) {
    const index = MENU_NAME.main.indexOf(name);

    if (index >= 0) {
      this.#quantity.main[index] += count;
      this.#amount += MENU_PRIZE.main[index] * count;
    }
  }

  #countDessert([name, count]) {
    const index = MENU_NAME.dessert.indexOf(name);

    if (index >= 0) {
      this.#quantity.dessert[index] += count;
      this.#amount += MENU_PRIZE.dessert[index] * count;
    }
  }

  #countDrink([name, count]) {
    const index = MENU_NAME.drink.indexOf(name);
    if (index >= 0) {
      this.#quantity.drink[index] += count;
      this.#amount += MENU_PRIZE.drink[index] * count;
    }
  }

  getQuantity() {
    return this.#quantity;
  }

  getAmount() {
    return this.#amount;
  }
}

const p = new Product();
p.purchase([['초코케이크', 2]]);
Console.print(p.getQuantity());

export default Product;
