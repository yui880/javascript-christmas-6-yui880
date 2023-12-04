import { Console } from '@woowacourse/mission-utils';
import { MESSAGE, TITLE, UNIT } from '../constant/message.js';
import { GIFT_ITEM } from '../constant/menu.js';

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
};

export default OutputView;
