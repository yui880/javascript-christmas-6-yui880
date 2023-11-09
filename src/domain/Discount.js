import { DISCOUNT_AMOUNT, PERIOD, SPECIAL_DAY, WEEK } from '../constant.js';

class Discount {
  #list;

  constructor() {
    this.#list = {
      christmas: 0,
      weekDay: 0,
      weekend: 0,
      special: 0,
    };
  }

  apply(totalAmount, purchaseList, day) {
    if (totalAmount < DISCOUNT_AMOUNT.minimum) return;

    const dayOfWeek = this.getDayOfWeek(day);

    this.#applyChristmasEvent(day);
    this.#applyWeekDayEvent(purchaseList, dayOfWeek);
    this.#applyWeekendEvent(purchaseList, dayOfWeek);
    this.#applySpecialEvent(day);
  }

  #applyChristmasEvent(day) {
    if (day >= PERIOD.christmas.start && day <= PERIOD.christmas.end) {
      this.#list.christmas += DISCOUNT_AMOUNT.base + DISCOUNT_AMOUNT.addition * (day - 1);
    }
  }

  #applyWeekDayEvent(purchaseList, dayOfWeek) {
    if (dayOfWeek >= WEEK.sunday && dayOfWeek <= WEEK.thursday) {
      const dessertCount = purchaseList.dessert.reduce((sum, cnt) => sum + cnt, 0);

      if (dessertCount > 0) {
        this.#list.weekDay += DISCOUNT_AMOUNT.week * dessertCount;
      }
    }
  }

  #applyWeekendEvent(purchaseList, dayOfWeek) {
    if (dayOfWeek === WEEK.friday || dayOfWeek === WEEK.saturday) {
      const mainCount = purchaseList.main.reduce((sum, cnt) => sum + cnt, 0);

      if (mainCount > 0) {
        this.#list.weekend += DISCOUNT_AMOUNT.week * mainCount;
      }
    }
  }

  #applySpecialEvent(day) {
    if (SPECIAL_DAY.includes(day)) {
      this.#list.special += 1000;
    }
  }

  getDayOfWeek(day) {
    return new Date(`2023-12-${day}`).getDay();
  }

  getAmount() {
    return Object.values(this.#list).reduce((sum, item) => sum + item);
  }
}

export default Discount;
