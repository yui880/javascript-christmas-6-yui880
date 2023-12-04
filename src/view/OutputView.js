import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constant/message.js';

const OutputView = {
  printWelcome() {
    Console.print(MESSAGE.welcome);
  },

  printPreviewMessage(day) {
    Console.print(MESSAGE.previewTitle(day));
  },
};

export default OutputView;
