import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constant/message.js';

const InputView = {
  async readVisitDate() {
    return await Console.readLineAsync(`${MESSAGE.enterVisitDate}\n`);
  },

  async readMenus() {
    return await Console.readLineAsync(`${MESSAGE.enterMenu}\n`);
  },
};

export default InputView;
