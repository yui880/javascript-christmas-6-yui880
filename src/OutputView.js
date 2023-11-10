import { Console } from '@woowacourse/mission-utils';
import { COUNT_UNIT, EVENT_TITLE } from './constant.js';

const OutputView = {
  printDescription(message) {
    Console.print(message);
  },

  printMenu(menuList) {
    Console.print(EVENT_TITLE.menu);
    menuList.forEach(([name, count]) => {
      Console.print(`${name} ${count}${COUNT_UNIT.item}`);
    });
  },

  printTotalAmount(amount) {
    Console.print(EVENT_TITLE.beforeDiscount);
    Console.print(`${this.formatNumber(amount)}${COUNT_UNIT.item}`);
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
