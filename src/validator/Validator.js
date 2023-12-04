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
      throw new ValidationError(ERROR.invalidDate);
    }
  },

  checkIsInEventPeriod(input) {
    if (Number(input) < EVENT_PERIOD.default.start || Number(input) > EVENT_PERIOD.default.end) {
      throw new ValidationError(ERROR.invalidDate);
    }
  },

  checkNamesInMenu(inputs) {
    inputs.forEach(([name, count]) => {
      if (!ALL_MENU_NAME.includes(name)) {
        throw new ValidationError(ERROR.invalidMenu);
      }
    });
  },

  checkCountsInRange(inputs) {
    inputs.forEach(([name, count]) => {
      if (count < RANGE.count.min || count > RANGE.count.max) {
        throw new ValidationError(ERROR.invalidMenu);
      }
    });
  },

  checkTotalCountInRange(inputs) {
    const totalCount = inputs.reduce((sum, [name, count]) => sum + count, 0);

    if (totalCount < RANGE.count.min || totalCount > RANGE.count.max) {
      throw new ValidationError(ERROR.invalidMenu);
    }
  },

  checkHasDuplicate(inputs) {
    const menuNames = inputs.map(([name, count]) => name);

    if (menuNames.length !== new Set(menuNames).size) {
      throw new ValidationError(ERROR.invalidMenu);
    }
  },

  checkHasDrinkOnly(inputs) {
    const menuNames = inputs.map(([name, count]) => name);

    if (menuNames.every((menu) => MENU_NAME.drink.includes(menu))) {
      throw new ValidationError(ERROR.invalidMenu);
    }
  },
};

export default Validator;
