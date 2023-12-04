import { Console } from '@woowacourse/mission-utils';
import { MESSAGE, TITLE, UNIT } from '../constant/message.js';

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
};

export default OutputView;
