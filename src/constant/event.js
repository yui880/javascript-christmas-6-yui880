export const EVENT_PRICE = Object.freeze({
  base: 1000,
  addition: 100,
  weekday: 2023,
  weekend: 2023,
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
});

export const DISCOUNT_EVENT = Object.freeze({
  christmas: 'christmas',
  weekday: 'weekday',
  weekend: 'weekend',
  special: 'special',
});

export const DISCOUNT_NAME = Object.keys(DISCOUNT_EVENT);
