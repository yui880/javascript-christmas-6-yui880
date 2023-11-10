import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from './constant.js';

const InputView = {
  async readDate() {
    const date = await Console.readLineAsync(MESSAGE.enterDate);

    return date;
  },

  async readMenu() {
    const menu = await Console.readLineAsync(MESSAGE.enterMenu);

    return menu;
  },
};

export default InputView;
