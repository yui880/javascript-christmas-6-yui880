import { ERROR, PERIOD } from './constant.js';
import ValidationError from './ValidationError.js';

const Validator = {
  checkIsInValidDateRange(date) {
    if (Number(date) < PERIOD.promotion.start || Number(date) > PERIOD.promotion.end) {
      throw new ValidationError(ERROR.invalidDate);
    }
    if (!Number.isInteger(Number(date))) {
      throw new ValidationError(ERROR.invalidDate);
    }
  },
};

export default Validator;
