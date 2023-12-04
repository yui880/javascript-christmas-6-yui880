import { ERROR } from '../constant/message.js';
import ValidationError from './ValidationError.js';
import { EVENT_PERIOD } from '../constant/event.js';
import { ALL_MENU_NAME } from '../constant/menu.js';

const Validator = {
  checkIsEmpty(input, errorMessage) {
    if (input.trim() === '') {
      throw new ValidationError(errorMessage);
    }
  },

  checkIsInteger(input) {
    if (!Number.isInteger(Number(input))) {
      throw new ValidationError(ERROR.date);
    }
  },

  checkIsInEventPeriod(input) {
    if (Number(input) < EVENT_PERIOD.default.min || Number(input) > EVENT_PERIOD.default.max) {
      throw new ValidationError(ERROR.date);
    }
  },

  checkIsNotInMenu(inputs) {
    inputs.forEach(([name, count]) => {
      if (!ALL_MENU_NAME.includes(name)) {
        throw new ValidationError(ERROR.menu);
      }
    });
  },

  checkIs,
};

export default Validator;
