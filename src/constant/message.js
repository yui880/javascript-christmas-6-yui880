import { DATE } from './constant.js';

export const MESSAGE = Object.freeze({
  welcome: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  enterVisitDate: `${DATE.eventMonth}월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)`,
  enterMenu:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
  previewTitle: (day) =>
    `${DATE.eventMonth}월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
});

export const TITLE = Object.freeze({
  orderMenu: '<주문 메뉴>',
  beforeDiscountPrice: '<할인 전 총주문 금액>',
  giftMenu: '<증정 메뉴>',
  benefitList: '<혜택 내역>',
  totalBenefit: '<총혜택 금액>',
  afterDiscountPrice: '<할인 후 예상 결제 금액>',
  badge: '<12월 이벤트 배지>',
});

export const UNIT = Object.freeze({
  count: '개',
  price: '원',
});
