export const CATEGORY = Object.freeze({
  appetizer: 'appetizer',
  main: 'main',
  dessert: 'dessert',
  drink: 'drink',
});

export const CATEGORY_NAME = Object.keys(CATEGORY);

export const MENU = Object.freeze({
  [CATEGORY.appetizer]: [
    { name: '양송이수프', price: 6_000 },
    { name: '타파스', price: 5_500 },
    { name: '시저샐러드', price: 8_000 },
  ],
  [CATEGORY.main]: [
    { name: '티본스테이크', price: 55_000 },
    { name: '바비큐립', price: 54_000 },
    { name: '해산물파스타', price: 35_000 },
    { name: '크리스마스파스타', price: 25_000 },
  ],
  [CATEGORY.dessert]: [
    { name: '초코케이크', price: 15_000 },
    { name: '아이스크림', price: 5_000 },
  ],
  [CATEGORY.drink]: [
    { name: '제로콜라', price: 3_000 },
    { name: '레드와인', price: 60_000 },
    { name: '샴페인', price: 25_000 },
  ],
});

export const MENU_NAME = Object.freeze({
  [CATEGORY.appetizer]: Object.values(CATEGORY.appetizer).map((menu) => menu.name),
  [CATEGORY.main]: Object.values(CATEGORY.main).map((menu) => menu.name),
  [CATEGORY.dessert]: Object.values(CATEGORY.dessert).map((menu) => menu.name),
  [CATEGORY.drink]: Object.values(CATEGORY.drink).map((menu) => menu.name),
});
