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
