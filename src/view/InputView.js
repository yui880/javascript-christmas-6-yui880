import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/message.js';

const InputView = {
  async readDate() {
    return await Console.readLineAsync(MESSAGE.enterDate);
  },

  async readMenu() {
    return await Console.readLineAsync(MESSAGE.enterMenu);
  },
};

export default InputView;
