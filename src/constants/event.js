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

export const BADGE = {
  star: { name: '별', amount: 5000 },
  tree: { name: '트리', amount: 10000 },
  santa: { name: '산타', amount: 20000 },
};
