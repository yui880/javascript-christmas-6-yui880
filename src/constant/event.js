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
  christmas: 'christmas',
  weekday: 'weekday',
  weekend: 'weekend',
  special: 'special',
});

export const DISCOUNT_NAME = Object.keys(DISCOUNT_EVENT);

export const BADGE = Object.freeze({
  empty: { name: '없음', price: 0 },
  star: { name: '별', price: 5_000 },
  tree: { name: '트리', price: 10_000 },
  santa: { name: '산타', price: 20_000 },
});
