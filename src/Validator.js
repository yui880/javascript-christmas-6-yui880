import { ALL_MENU_NAME, ERROR, MENU_NAME, PERIOD, RANGE } from './constant.js';
import ValidationError from './ValidationError.js';

const Validator = {
  validateDate(date) {
    this.checkIsInteger(date);
    this.checkIsValidDate(date);
  },

  validateMenu(menuList) {
    const names = menuList.map((menu) => menu[0]);
    const counts = menuList.map((menu) => Number(menu[1]));
    const countSum = counts.reduce((sum, count) => sum + count, 0);

    this.checkIsNumber(counts);
    this.checkIsNameInMenu(names);
    this.checkIsValidCount(counts);
    this.checkIsValidTotalCount(countSum);
    this.checkHasDuplicate(names);
    this.checkHasDrinkOnly(menuList, countSum);
  },

  checkIsValidDate(date) {
    if (Number(date) < PERIOD.promotion.start || Number(date) > PERIOD.promotion.end) {
      throw new ValidationError(ERROR.invalidDate);
    }
  },

  checkIsInteger(number) {
    if (!Number.isInteger(Number(number))) {
      throw new ValidationError(ERROR.invalidDate);
    }
  },

  checkIsNameInMenu(names) {
    names.forEach((name) => {
      if (!ALL_MENU_NAME.includes(name)) {
        throw new ValidationError(ERROR.invalidMenu);
      }
    });
  },

  checkIsValidCount(counts) {
    counts.forEach((count) => {
      if (count < RANGE.minLen || count > RANGE.maxLen) {
        throw new ValidationError(ERROR.invalidMenu);
      }
    });
  },

  checkIsValidTotalCount(countSum) {
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
        return sum + Number(count);
      }
      return sum;
    }, 0);

    if (countSum === drinkCount) {
      throw new ValidationError(ERROR.invalidMenu);
    }
  },
};

export default Validator;
