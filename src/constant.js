export const DISCOUNT_STANDARD = Object.freeze({
  base: 1000,
  addition: 100,
  week: 2023,
  minimum: 10000,
  minimumForGift: 120_000,
});

export const RANGE = Object.freeze({
  minLen: 1,
  maxLen: 20,
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
  eventDate: (day) => `2023-12-${day}`,
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

export const CATEGORY = Object.keys(MENU);
export const ALL_MENU_NAME = Object.values(MENU_NAME).flat();

export const MENU_PRICE = {
  appetizer: MENU.appetizer.map((food) => food.price),
  main: MENU.main.map((food) => food.price),
  dessert: MENU.dessert.map((food) => food.price),
  drink: MENU.drink.map((food) => food.price),
};

export const MESSAGE = {
  welcome: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  enterDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  enterMenu:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
  preview: (day) => `12월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
};

export const TITLE = {
  menu: '\n<주문 메뉴>',
  beforeDiscount: '\n<할인 전 총주문 금액>',
  gift: '\n<증정 메뉴>',
  benefitList: '\n<혜택 내역>',
  totalBenefit: '\n<총혜택 금액>',
  afterDiscount: '\n<할인 후 예상 결제 금액>',
  badge: '\n<12월 이벤트 배지>',
};

export const DISCOUNT_EVENT = {
  christmas: '크리스마스 디데이 할인:',
  weekday: '평일 할인:',
  weekend: '주말 할인:',
  special: '특별 할인:',
};

export const GIFT_EVENT = {
  gift: '증정 이벤트:',
};

export const EVENT = {
  ...DISCOUNT_EVENT,
  ...GIFT_EVENT,
};

export const EVENT_NAME = Object.values(EVENT);

export const COUNT_UNIT = {
  item: '개',
  money: '원',
  empty: '없음',
};

export const BADGE = {
  star: { name: '별', amount: 5000 },
  tree: { name: '트리', amount: 10000 },
  santa: { name: '산타', amount: 20000 },
};

export const REGEX = {
  ThousandSeparator: /\B(?=(\d{3})+(?!\d))/g,
};

export const ERROR = {
  errorPrefix: '[ERROR]',
  invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  invalidMenu: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
};
