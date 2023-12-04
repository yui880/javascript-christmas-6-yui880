import { ERROR } from '../constant/message.js';
import ValidationError from './ValidationError.js';
import { EVENT_PERIOD } from '../constant/event.js';
import { ALL_MENU_NAME, MENU_NAME } from '../constant/menu.js';
import { RANGE } from '../constant/constant.js';

const Validator = {
  checkIsEmpty(input, errorMessage) {
    if (input === '') {
      throw new ValidationError(errorMessage);
    }
  },

  checkIsInteger(input) {
    if (!Number.isInteger(Number(input))) {
      throw new ValidationError(ERROR.date);
    }
  },

  checkIsInEventPeriod(input) {
    if (Number(input) < EVENT_PERIOD.default.start || Number(input) > EVENT_PERIOD.default.end) {
      throw new ValidationError(ERROR.date);
    }
  },

  checkNamesInMenu(inputs) {
    inputs.forEach(([name, count]) => {
      if (!ALL_MENU_NAME.includes(name)) {
        throw new ValidationError(ERROR.menu);
      }
    });
  },

  checkCountsInRange(inputs) {
    inputs.forEach(([name, count]) => {
      if (count < RANGE.count.min || count > RANGE.count.max) {
        throw new ValidationError(ERROR.menu);
      }
    });
  },

  checkTotalCountInRange(inputs) {
    const totalCount = inputs.reduce((sum, [name, count]) => sum + count, 0);

    if (totalCount < RANGE.count.min || totalCount > RANGE.count.max) {
      throw new ValidationError(ERROR.menu);
    }
  },

  checkHasDuplicate(inputs) {
    const menuNames = inputs.map(([name, count]) => name);

    if (menuNames.length !== new Set(menuNames).size) {
      throw new ValidationError(ERROR.menu);
    }
  },

  checkHasDrinkOnly(inputs) {
    const menuNames = inputs.map(([name, count]) => name);

    if (menuNames.every((menu) => MENU_NAME.drink.includes(menu))) {
      throw new ValidationError(ERROR.menu);
    }
  },
};

export default Validator;
