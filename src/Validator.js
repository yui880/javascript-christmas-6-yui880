import { ALL_MENU_NAME, ERROR, MENU_NAME, PERIOD, RANGE } from './constant.js';
import ValidationError from './ValidationError.js';

const Validator = {
  validateDate(date) {
    if (Number(date) < PERIOD.promotion.start || Number(date) > PERIOD.promotion.end) {
      throw new ValidationError(ERROR.invalidDate);
    }
    if (!Number.isInteger(Number(date))) {
      throw new ValidationError(ERROR.invalidDate);
    }
  },
  checkIsNameInMenu(names) {
    names.forEach((name) => {
      if (!ALL_MENU_NAME.includes(name)) {
        throw new ValidationError(ERROR.invalidDate);
      }
    });
  },
};

export default Validator;
