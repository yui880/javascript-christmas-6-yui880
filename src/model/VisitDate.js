import { DATE } from '../constant/constant.js';
import { EVENT_PERIOD, EVENT_PRICE } from '../constant/event.js';
import Validator from '../validator/Validator.js';
import { ERROR } from '../constant/message.js';

class VisitDate {
  #dayNumber;

  #dayOfWeek;

  constructor(day) {
    this.#validateVisitDate(day);
    this.#dayNumber = Number(day);
    this.#dayOfWeek = this.#getDayOfWeek(day);
  }

  #validateVisitDate(day) {
    Validator.checkIsEmpty(day, ERROR.invalidDate);
    Validator.checkIsInteger(day);
    Validator.checkIsInEventPeriod(day);
  }

  #getDayOfWeek(day) {
    return new Date(DATE.eventDate(day)).getDay();
  }

  isChristmasDay() {
    return (
      this.#dayNumber >= EVENT_PERIOD.christmas.start &&
      this.#dayNumber <= EVENT_PERIOD.christmas.end
    );
  }

  isWeekday() {
    return (
      this.#dayOfWeek >= EVENT_PERIOD.weekday.start && this.#dayOfWeek <= EVENT_PERIOD.weekday.end
    );
  }

  isWeekend() {
    return (
      this.#dayOfWeek >= EVENT_PERIOD.weekend.start && this.#dayOfWeek <= EVENT_PERIOD.weekend.end
    );
  }

  isSpecialDay() {
    return EVENT_PERIOD.special.includes(this.#dayNumber);
  }

  getChristmasDiscountAmount() {
    return EVENT_PRICE.base + EVENT_PRICE.addition * (this.#dayNumber - 1);
  }
}

export default VisitDate;
