import { PERIOD, RANGE } from '../constants/constant.js';
import ValidationError from './ValidationError.js';
import { ALL_MENU_NAME, MENU_NAME } from '../constants/menu.js';
import { ERROR } from '../constants/message.js';

const Validator = {
  validateDate(date) {
    this.checkIsInteger(date);
    this.checkIsValidDate(date);
  },

  validateMenu(menuList) {
    const names = menuList.map((menu) => menu[0]);
    const counts = menuList.map((menu) => Number(menu[1]));
    const countSum = counts.reduce((sum, count) => sum + Number(count), 0);

    this.checkIsAllInteger(counts);
    this.checkIsNameInMenu(names);
    this.checkIsValidCount(counts);
    this.checkIsValidTotalCount(countSum);
    this.checkHasDuplicate(names);
    this.checkHasDrinkOnly(menuList, countSum);
  },

  checkIsValidDate(date) {
    const numericDate = Number(date);
    if (
      Number.isNaN(numericDate) ||
      numericDate < PERIOD.promotion.start ||
      numericDate > PERIOD.promotion.end
    ) {
      throw new ValidationError(ERROR.invalidDate);
    }
  },

  checkIsInteger(number) {
    if (this.isInteger(number)) {
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

  checkIsAllInteger(counts) {
    counts.forEach((count) => {
      if (this.isInteger(count)) {
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

  isInteger: (number) => number === '' || !Number.isInteger(Number(number)),
};

export default Validator;
