import { DATE } from '../constant/constant.js';

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
}

export default VisitDate;
