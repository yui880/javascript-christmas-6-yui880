import { Console } from '@woowacourse/mission-utils';
import { COUNT_UNIT, TITLE, GIFT_ITEM, REGEX, MESSAGE, EVENT_NAME } from './constant.js';

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

  printGift(giftCount) {
    Console.print(TITLE.gift);

    if (giftCount <= 0) {
      Console.print(`${COUNT_UNIT.empty}`);
      return;
    }
    Console.print(`${GIFT_ITEM.name} ${giftCount}${COUNT_UNIT.item}`);
  },

  printDiscountList(isEmpty, eventResult) {
    Console.print(TITLE.benefitList);

    if (isEmpty) {
      Console.print(`${COUNT_UNIT.empty}`);
      return;
    }
    eventResult.forEach((amount, index) => {
      if (amount > 0) {
        Console.print(`${EVENT_NAME[index]} ${this.formatNumber(-amount)}${COUNT_UNIT.money}`);
      }
    });
  },

  printTotalBenefit(amount) {
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
