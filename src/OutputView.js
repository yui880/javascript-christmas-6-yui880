import { Console } from '@woowacourse/mission-utils';
import { EVENT_TITLE } from './constant.js';

const OutputView = {
  printDescription(message) {
    Console.print(message);
  },

  printMenu(menu) {
    Console.print(EVENT_TITLE.menu);
    // ...
  },

  printError(message) {
    Console.print(message);
  },
};

export default OutputView;
