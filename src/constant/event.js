export const EVENT_PRICE = Object.freeze({
  base: 1000,
  addition: 100,
  weekday: 2023,
  weekend: 2023,
  special: 1000,
  minimumForGift: 120_000,
  minimumForEvent: 10_000,
});

export const EVENT_PERIOD = Object.freeze({
  default: {
    start: 1,
    end: 31,
  },
  christmas: {
    start: 1,
    end: 25,
  },
  weekday: {
    start: 0,
    end: 4,
  },
  weekend: {
    start: 5,
    end: 6,
  },
  special: [3, 10, 17, 24, 25, 31],
});

export const DISCOUNT_EVENT = Object.freeze({
  christmas: '크리스마스 디데이 할인',
  weekday: '평일 할인',
  weekend: '특별 할인',
  special: '증정 이벤트',
});
export const DISCOUNT_NAME = Object.keys(DISCOUNT_EVENT);

export const GIFT_EVENT = Object.freeze({
  gift: '증정 이벤트',
});

export const EVENT = { ...DISCOUNT_EVENT, ...GIFT_EVENT };

export const EVENT_NAME = Object.values(EVENT);

export const BADGE = Object.freeze({
  empty: { name: '없음', price: 0 },
  star: { name: '별', price: 5_000 },
  tree: { name: '트리', price: 10_000 },
  santa: { name: '산타', price: 20_000 },
});
