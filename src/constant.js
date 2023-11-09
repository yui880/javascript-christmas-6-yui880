export const DISCOUNT_STANDARD = Object.freeze({
  base: 1000,
  addition: 100,
  week: 2023,
  minimum: 10000,
  minimumForGift: 120_000,
});

export const PERIOD = Object.freeze({
  christmas: {
    start: 1,
    end: 25,
  },
  promotion: {
    start: 1,
    end: 31,
  },
});

export const WEEK = Object.freeze({
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
});

export const SPECIAL_DAY = [3, 10, 17, 24, 25, 31];

export const GIFT_ITEM = {
  name: '샴페인',
  price: 25000,
};
export const MENU = Object.freeze({
  appetizer: [
    { name: '양송이수프', price: 6000 },
    { name: '타파스', price: 5500 },
    { name: '시저샐러드', price: 8000 },
  ],
  main: [
    { name: '티본스테이크', price: 55000 },
    { name: '바비큐립', price: 54000 },
    { name: '해산물파스타', price: 35000 },
    { name: '크리스마스파스타', price: 25000 },
  ],
  dessert: [
    { name: '초코케이크', price: 15000 },
    { name: '아이스크림', price: 5000 },
  ],
  drink: [{ name: '제로콜라', price: 3000 }, { name: '레드와인', price: 60000 }, GIFT_ITEM],
});

export const MENU_NAME = {
  appetizer: MENU.appetizer.map((food) => food.name),
  main: MENU.main.map((food) => food.name),
  dessert: MENU.dessert.map((food) => food.name),
  drink: MENU.drink.map((food) => food.name),
};

export const MENU_PRIZE = {
  appetizer: MENU.appetizer.map((food) => food.price),
  main: MENU.main.map((food) => food.price),
  dessert: MENU.dessert.map((food) => food.price),
  drink: MENU.drink.map((food) => food.price),
};
