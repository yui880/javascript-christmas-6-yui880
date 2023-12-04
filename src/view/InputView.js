import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constant/message.js';

const InputView = {
  async readVisitDate() {
    return await Console.readLineAsync(`${MESSAGE.enterVisitDate}\n`);
  },

  async readMenu() {
    return await Console.readLineAsync(`${MESSAGE.enterMenu}\n`);
  },
};

export default InputView;
