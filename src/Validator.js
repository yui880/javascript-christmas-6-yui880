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

  checkIsNumber(counts) {
    counts.forEach((count) => {
      if (Number.isNaN(Number(count)) || count === '') {
        throw new ValidationError(ERROR.invalidMenu);
      }
    });
  },

  checkHasDrinkOnly(menuList, countSum) {
    const drinkCount = menuList.reduce((sum, [name, count]) => {
      if (MENU_NAME.drink.includes(name)) {
        return sum + count;
      }
      return sum;
    }, 0);

    if (countSum === drinkCount) {
      throw new ValidationError(ERROR.invalidMenu);
    }
  },
};

export default Validator;
