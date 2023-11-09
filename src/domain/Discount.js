import { DISCOUNT_AMOUNT, PERIOD, SPECIAL_DAY, WEEK } from '../constant.js';
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

  apply(totalAmount, purchaseList, day) {
    if (totalAmount < DISCOUNT_STANDARD.minimum) return;

    const dayOfWeek = this.getDayOfWeek(day);

    this.#applyChristmasEvent(day);
    this.#applyWeekDayEvent(purchaseList, dayOfWeek);
    this.#applyWeekendEvent(purchaseList, dayOfWeek);
    this.#applySpecialEvent(day);
  }

  #applyChristmasEvent(day) {
    if (day >= PERIOD.christmas.start && day <= PERIOD.christmas.end) {
      this.#amountList.christmas += DISCOUNT_STANDARD.base + DISCOUNT_STANDARD.addition * (day - 1);
    }
  }

  #applyWeekDayEvent(purchaseList, dayOfWeek) {
    if (dayOfWeek >= WEEK.sunday && dayOfWeek <= WEEK.thursday) {
      const dessertCount = purchaseList.dessert.reduce((sum, cnt) => sum + cnt, 0);

      if (dessertCount > 0) {
        this.#amountList.weekDay += DISCOUNT_STANDARD.week * dessertCount;
      }
    }
  }

  #applyWeekendEvent(purchaseList, dayOfWeek) {
    if (dayOfWeek === WEEK.friday || dayOfWeek === WEEK.saturday) {
      const mainCount = purchaseList.main.reduce((sum, cnt) => sum + cnt, 0);

      if (mainCount > 0) {
        this.#amountList.weekend += DISCOUNT_STANDARD.week * mainCount;
      }
    }
  }

  #applySpecialEvent(day) {
    if (SPECIAL_DAY.includes(day)) {
      this.#amountList.special += 1000;
    }
  }

  getDayOfWeek(day) {
    return new Date(`2023-12-${day}`).getDay();
  }

  getAmount() {
    return Object.values(this.#amountList).reduce((sum, item) => sum + item);
  }
}

// const discount = new Discount();
// discount.apply(30000, { dessert: [0, 0, 1], main: [1, 1, 1, 1] }, 1);
// Console.print(discount.getAmount());
export default Discount;
