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

export const COUNT_UNIT = {
  item: '개',
  money: '원',
  empty: '없음',
};

export const REGEX = {
  ThousandSeparator: /\B(?=(\d{3})+(?!\d))/g,
};

export const ERROR = {
  errorPrefix: '[ERROR]',
  invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  invalidMenu: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
};
