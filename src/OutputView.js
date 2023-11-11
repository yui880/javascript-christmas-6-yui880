import { Console } from '@woowacourse/mission-utils';
import { COUNT_UNIT, TITLE, GIFT_ITEM, EVENT, REGEX, MESSAGE } from './constant.js';

const OutputView = {
  printDescription() {
    Console.print(MESSAGE.welcome);
  },

  printPreviewMessage(date) {
    Console.print(MESSAGE.preview(date));
  },

  printMenu(menuList) {
    Console.print(TITLE.menu);
    menuList.forEach(([name, count]) => {
      Console.print(`${name} ${count}${COUNT_UNIT.item}`);
    });
  },

  printTotalAmount(amount) {
    Console.print(TITLE.beforeDiscount);
    Console.print(`${this.formatNumber(amount)}${COUNT_UNIT.money}`);
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
    const eventNames = Object.values(EVENT);

    if (discountCount === 0 && giftAmount === 0) {
      Console.print(`${COUNT_UNIT.empty}`);
      return;
    }
    this.printDiscountAmount(discountAmount, eventNames);
    this.printGiftAmount(giftAmount, eventNames);
  },

  printDiscountAmount(discountAmount, eventNames) {
    discountAmount.forEach((amount, index) => {
      if (amount > 0) {
        Console.print(`${eventNames[index]} ${this.formatNumber(-amount)}${COUNT_UNIT.money}`);
      }
    });
  },

  printGiftAmount(giftAmount, eventNames) {
    if (giftAmount > 0) {
      Console.print(
        `${eventNames[eventNames.length - 1]} ${this.formatNumber(-giftAmount)}${COUNT_UNIT.money}`,
      );
    }
  },

  printTotalDiscount(amount) {
    Console.print(TITLE.totalBenefit);
    Console.print(`${this.formatNumber(-amount)}${COUNT_UNIT.money}`);
  },

  printAfterDiscount(amount) {
    Console.print(TITLE.afterDiscount);
    Console.print(`${this.formatNumber(amount)}${COUNT_UNIT.money}`);
  },

  printBadge(badge) {
    Console.print(TITLE.badge);
    Console.print(badge);
  },

  printError(message) {
    Console.print(message);
  },

  formatNumber(number) {
    return String(number).replace(REGEX.ThousandSeparator, ',');
  },
};

export default OutputView;
