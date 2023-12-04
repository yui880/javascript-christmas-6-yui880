import { Console } from '@woowacourse/mission-utils';
import { MESSAGE, TITLE, UNIT } from '../constant/message.js';
import { GIFT_ITEM } from '../constant/menu.js';
import { EVENT_NAME } from '../constant/event.js';

const OutputView = {
  printWelcome() {
    Console.print(MESSAGE.welcome);
  },

  printPreviewMessage(day) {
    Console.print(MESSAGE.previewTitle(day));
  },

  printMenuList(menuList) {
    Console.print(`\n${TITLE.orderMenu}`);
    menuList.forEach(([name, count]) => {
      Console.print(`${name} ${count}${UNIT.count}`);
    });
  },

  printBeforeDiscountPrice(price) {
    Console.print(`\n${TITLE.beforeDiscountPrice}`);
    Console.print(`${price.toLocaleString('ko-KR')}${UNIT.price}`);
  },

  printGiftMenu(giftCount) {
    Console.print(`\n${TITLE.giftMenu}`);

    if (giftCount <= 0) {
      Console.print(UNIT.empty);
      return;
    }
    Console.print(`${GIFT_ITEM.name} ${giftCount}${UNIT.count}`);
  },

  printBenefitList(benefitList) {
    Console.print(`\n${TITLE.benefitList}`);

    if (benefitList.every((benefit) => benefit === 0)) {
      Console.print(UNIT.empty);
      return;
    }

    benefitList.forEach((benefit, index) => {
      if (benefit <= 0) return;
      Console.print(`${EVENT_NAME[index]}: ${(benefit * -1).toLocaleString('ko-KR')}${UNIT.price}`);
    });
  },

  printTotalBenefitPrice(price) {
    Console.print(`\n${TITLE.totalBenefit}`);
    Console.print(`${(price * -1).toLocaleString('ko-KR')}${UNIT.price}`);
  },

  printAfterDiscountPrice(price) {
    Console.print(`\n${TITLE.afterDiscountPrice}`);
    Console.print(`${price.toLocaleString('ko-KR')}${UNIT.price}`);
  },
};

export default OutputView;
