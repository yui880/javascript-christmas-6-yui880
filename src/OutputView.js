import { Console } from '@woowacourse/mission-utils';
import { COUNT_UNIT, TITLE, GIFT_ITEM } from './constant.js';

const OutputView = {
  printDescription(message) {
    Console.print(message);
  },

  printMenu(menuList) {
    Console.print(TITLE.menu);
    menuList.forEach(([name, count]) => {
      Console.print(`${name} ${count}${COUNT_UNIT.item}`);
    });
  },

  printTotalAmount(amount) {
    Console.print(TITLE.beforeDiscount);
    Console.print(`${this.formatNumber(amount)}${COUNT_UNIT.item}`);
  },

  printGift(giftAmount) {
    Console.print(TITLE.gift);

    if (giftAmount > 0) {
      Console.print(`${GIFT_ITEM.name} 1${COUNT_UNIT.item}`);
      return;
    }
    Console.print(`${COUNT_UNIT.empty}`);
  },
  printError(message) {
    Console.print(message);
  },

  formatNumber(number) {
    const numberString = String(number);

    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
};

export default OutputView;
