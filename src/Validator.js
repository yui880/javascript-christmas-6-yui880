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

  checkIsValidCount(countSum) {
    if (countSum < RANGE.minLen || countSum > RANGE.maxLen) {
      throw new ValidationError(ERROR.invalidMenu);
    }
  },
  checkHasDuplicate(names) {
    if (names.length !== new Set(names).size) {
      throw new ValidationError(ERROR.invalidMenu);
    }
  },
};

export default Validator;
