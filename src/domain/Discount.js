import { DISCOUNT_STANDARD, PERIOD, SPECIAL_DAY, WEEK } from '../constant.js';

class Discount {
  #amountList;

  constructor() {
    this.#amountList = {
      christmas: 0,
      weekDay: 0,
      weekend: 0,
      special: 0,
    };
  }

  apply(product, day) {
    if (product.getPrice() < DISCOUNT_STANDARD.minimum) return;

    const dayOfWeek = this.getDayOfWeek(day);

    this.#applyChristmasEvent(day);
    this.#applyWeekDayEvent(product.getDessertOrderCount(), dayOfWeek);
    this.#applyWeekendEvent(product.getMainOrderCount(), dayOfWeek);
    this.#applySpecialEvent(day);
  }

  #applyChristmasEvent(day) {
    if (day >= PERIOD.christmas.start && day <= PERIOD.christmas.end) {
      this.#amountList.christmas += DISCOUNT_STANDARD.base + DISCOUNT_STANDARD.addition * (day - 1);
    }
  }

  #applyWeekDayEvent(dessertCount, dayOfWeek) {
    if (dayOfWeek >= WEEK.sunday && dayOfWeek <= WEEK.thursday && dessertCount > 0) {
      this.#amountList.weekDay += DISCOUNT_STANDARD.week * dessertCount;
    }
  }

  #applyWeekendEvent(mainCount, dayOfWeek) {
    if (mainCount > 0 && (dayOfWeek === WEEK.friday || dayOfWeek === WEEK.saturday)) {
      this.#amountList.weekend += DISCOUNT_STANDARD.week * mainCount;
    }
  }

  #applySpecialEvent(day) {
    if (SPECIAL_DAY.includes(Number(day))) {
      this.#amountList.special += 1000;
    }
  }

  getDayOfWeek(day) {
    return new Date(`2023-12-${day}`).getDay();
  }

  getAmount() {
    return Object.values(this.#amountList).reduce((sum, item) => sum + item);
  }

  getAmountList() {
    return this.#amountList;
  }
}

export default Discount;
