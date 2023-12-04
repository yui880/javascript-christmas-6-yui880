import { DATE } from '../constant/constant.js';
import { EVENT_PERIOD, EVENT_PRICE } from '../constant/event.js';

class VisitDate {
  #dayNumber;

  #dayOfWeek;

  constructor(day) {
    this.#dayNumber = day;
    this.#dayOfWeek = this.#getDayOfWeek(day);
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

  getChristmasDiscountAmount() {
    return EVENT_PRICE.base + EVENT_PRICE.addition * (this.#dayNumber - 1);
  }
}

export default VisitDate;
