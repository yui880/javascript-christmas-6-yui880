import Validator from '../validator/Validator.js';
import { DISCOUNT_STANDARD, PERIOD, SPECIAL_DAY, WEEK } from '../constants/constant.js';

class Day {
  #dayNumber;

  #dayOfWeek;

  constructor(number) {
    this.#validateDay(number);
    this.#dayNumber = Number(number);
    this.#dayOfWeek = this.getDayOfWeek();
  }

  #validateDay(number) {
    Validator.validateDate(number);
  }

  getDayOfWeek() {
    return new Date(PERIOD.eventDate(this.#dayNumber)).getDay();
  }

  isChristmasDay() {
    return this.#dayNumber >= PERIOD.christmas.start && this.#dayNumber <= PERIOD.christmas.end;
  }

  isWeekday() {
    return this.#dayOfWeek >= WEEK.sunday && this.#dayOfWeek <= WEEK.thursday;
  }

  isWeekend() {
    return this.#dayOfWeek === WEEK.friday || this.#dayOfWeek === WEEK.saturday;
  }

  isSpecialDay() {
    return SPECIAL_DAY.includes(Number(this.#dayNumber));
  }

  getChristmasDiscountAmount() {
    return DISCOUNT_STANDARD.base + DISCOUNT_STANDARD.addition * (this.#dayNumber - 1);
  }
}

export default Day;
