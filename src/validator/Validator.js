import { ERROR } from '../constant/message.js';
import ValidationError from './ValidationError.js';
import { EVENT_PERIOD } from '../constant/event.js';

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
};

export default Validator;
