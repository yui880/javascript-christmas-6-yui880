import { Console } from '@woowacourse/mission-utils';
import { MENU, MENU_NAME, MENU_PRIZE } from '../constant.js';
import { MENU, MENU_NAME, MENU_PRICE } from '../constant.js';
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
      this.#quantity.appetizer[index] += Number(count);
      this.#amount += MENU_PRICE.appetizer[index] * Number(count);
    }
  }

  #countByCategory({ category, name, count }) {
    const index = MENU_NAME[category].indexOf(name);

    if (index >= 0) {
      this.#quantity[category][index] += Number(count);
      this.#amount += MENU_PRICE[category][index] * Number(count);
    }
  }

  #countMain([name, count]) {
    const index = MENU_NAME.main.indexOf(name);

    if (index >= 0) {
      this.#quantity.main[index] += Number(count);
      this.#amount += MENU_PRICE.main[index] * Number(count);
    }
  }

  #countDessert([name, count]) {
    const index = MENU_NAME.dessert.indexOf(name);

    if (index >= 0) {
      this.#quantity.dessert[index] += Number(count);
      this.#amount += MENU_PRICE.dessert[index] * Number(count);
    }
  }

  #countDrink([name, count]) {
    const index = MENU_NAME.drink.indexOf(name);
    if (index >= 0) {
      this.#quantity.drink[index] += Number(count);
      this.#amount += MENU_PRICE.drink[index] * Number(count);
    }
  }

  getQuantity() {
    return this.#quantity;
  }

  getAmount() {
    return this.#amount;
  }
}

// const p = new Product();
// p.purchase([['초코케이크', 2]]);
// Console.print(p.getQuantity());
// Console.print(p.getAmount());

export default Product;
