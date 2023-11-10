import { Console } from '@woowacourse/mission-utils';
import { COUNT_UNIT, TITLE, GIFT_ITEM, EVENT } from './constant.js';

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

  printDiscountList(discountList, giftAmount) {
    Console.print(TITLE.benefitList);
    const discountCount = Object.values(discountList).reduce((sum, item) => sum + item, 0);
    const discountAmount = Object.values(discountList);
    if (discountCount === 0 && giftAmount === 0) {
      Console.print(`${COUNT_UNIT.empty}`);
    }
    const eventNames = Object.values(EVENT);
    discountAmount.forEach((amount, index) => {
      if (amount > 0) Console.print(`${eventNames[index]} -${amount}${COUNT_UNIT.money}`);
    });
    if (giftAmount > 0) {
      Console.print(`${eventNames[eventNames.length - 1]} -${giftAmount}${COUNT_UNIT.money}`);
    }
  },

  printTotalDiscount(amount) {
    Console.print(TITLE.totalBenefit);
    Console.print(`-${this.formatNumber(amount)}${COUNT_UNIT.money}`);
  },

  printAfterDiscount(amount) {
    Console.print(TITLE.afterDiscount);
    Console.print(`${this.formatNumber(amount)}${COUNT_UNIT.money}`);
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
