import { MissionUtils } from '@woowacourse/mission-utils';
import Promotion from '../src/domain/Promotion.js';
import { BADGE, COUNT_UNIT } from '../src/constant.js';
import Product from '../src/domain/Product.js';

const getDiscountMock = ({ isEmpty = false, getAmountByEvent = 0, getAmount = 0 }) => ({
  isEmpty: jest.fn(() => isEmpty),
  getAmountByEvent: jest.fn(() => getAmountByEvent),
  getAmount: jest.fn(() => getAmount),
});

const getGiftMock = ({ isEmpty = false, getAmount = 0 }) => ({
  isEmpty: jest.fn(() => isEmpty),
  getAmount: jest.fn(() => getAmount),
});

describe('Promotion 클래스 테스트 - 다른 클래스 mock으로 대체', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    {
      discountList: [1000, 2023, 0, 0],
      giftAmount: 20000,
      benefitList: [1000, 2023, 0, 0, 20000],
    },
    {
      discountList: [3400, 0, 2023, 1000],
      giftAmount: 100,
      benefitList: [3400, 0, 2023, 1000, 100],
    },
  ])(
    '할인과 증정 금액 리스트를 합친 결과 리스트를 만드는 기능 테스트',
    ({ discountList, giftAmount, benefitList }) => {
      // given
      const discountMock = getDiscountMock({ getAmountByEvent: discountList });
      const giftMock = getGiftMock({ getAmount: giftAmount });
      const promotion = new Promotion(discountMock, giftMock);

      // when
      const result = promotion.getEventBenefitList();

      // then
      expect(result).toEqual(benefitList);
    },
  );

  test.each([
    { discountAmount: 1000, giftAmount: 20000, totalBenefitAmount: 21000 },
    { discountAmount: 3700, giftAmount: 2023, totalBenefitAmount: 5723 },
  ])(
    '이벤트로 얻을 수 있는 총 할인 금액을 구하는 기능 테스트',
    ({ discountAmount, giftAmount, totalBenefitAmount }) => {
      // given
      const discountMock = getDiscountMock({ getAmount: discountAmount });
      const giftMock = getGiftMock({ getAmount: giftAmount });
      const promotion = new Promotion(discountMock, giftMock);

      // when
      const result = promotion.getTotalBenefitAmount();

      // then
      expect(result).toBe(totalBenefitAmount);
    },
  );

  test.each([
    { totalBenefit: BADGE.star.amount - 1, badge: COUNT_UNIT.empty },
    { totalBenefit: BADGE.star.amount, badge: BADGE.star.name },
    { totalBenefit: BADGE.tree.amount, badge: BADGE.tree.name },
    { totalBenefit: BADGE.santa.amount, badge: BADGE.santa.name },
    { totalBenefit: BADGE.santa.amount + 1, badge: BADGE.santa.name },
  ])('할인 금액을 바탕으로 배지를 구하는 기능 테스트', ({ totalBenefit, badge }) => {
    // given
    const promotion = new Promotion();
    promotion.getTotalBenefitAmount = jest.fn(() => totalBenefit);

    // when
    const result = promotion.getBadge();

    // then
    expect(result).toBe(badge);
  });
});

describe('Promotion 클래스 테스트 - 다른 클래스 사용해서 테스트', () => {
  test.each([
    {
      menu: [
        ['타파스', 1],
        ['초코케이크', 1],
      ],
      day: 4,
      benefitList: [1300, 2023, 0, 0, 0],
    },
    {
      menu: [
        ['아이스크림', 1],
        ['크리스마스파스타', 2],
        ['티본스테이크', 2],
      ],
      day: 22,
      benefitList: [3100, 0, 8092, 0, 25000],
    },
  ])('할인과 증정 금액 리스트를 합친 결과를 만드는 기능 테스트', ({ menu, day, benefitList }) => {
    // given
    const promotion = new Promotion();
    promotion.conductEvent(new Product(menu), day);

    // when
    const result = promotion.getEventBenefitList();

    // then
    expect(result).toEqual(benefitList);
  });

  test.each([
    { menu: [['타파스', 1]], isEmpty: true },
    { menu: [['바비큐립', 1]], isEmpty: false },
  ])('총 할인 금액이 0원인지 확인하는 기능 테스트', ({ menu, isEmpty }) => {
    // given
    const promotion = new Promotion();
    promotion.conductEvent(new Product(menu), 1);

    // when
    const result = promotion.isEmpty();

    // then
    expect(result).toBe(isEmpty);
  });

  test.each([
    {
      menu: [
        ['타파스', 1],
        ['초코케이크', 1],
      ],
      day: 4,
      totalBenefitAmount: 3323,
    },
    {
      menu: [
        ['아이스크림', 1],
        ['크리스마스파스타', 2],
        ['티본스테이크', 2],
      ],
      day: 22,
      totalBenefitAmount: 36192,
    },
  ])(
    '이벤트로 얻을 수 있는 총 할인 금액을 구하는 기능 테스트',
    ({ menu, day, totalBenefitAmount }) => {
      // given
      const promotion = new Promotion();
      promotion.conductEvent(new Product(menu), day);

      // when
      const result = promotion.getTotalBenefitAmount();

      // then
      expect(result).toBe(totalBenefitAmount);
    },
  );

  test.each([
    {
      menu: [
        ['타파스', 1],
        ['초코케이크', 1],
      ],
      day: 4,
      badge: COUNT_UNIT.empty,
    },
    {
      menu: [['해산물파스타', 2]],
      day: 23,
      badge: BADGE.star.name,
    },
    {
      menu: [['초코케이크', 5]],
      day: 17,
      badge: BADGE.tree.name,
    },
    {
      menu: [
        ['아이스크림', 1],
        ['크리스마스파스타', 2],
        ['티본스테이크', 2],
      ],
      day: 22,
      badge: BADGE.santa.name,
    },
  ])('할인 금액을 바탕으로 배지를 구하는 기능 테스트', ({ menu, day, badge }) => {
    // given
    const promotion = new Promotion();
    promotion.conductEvent(new Product(menu), day);

    // when
    const result = promotion.getBadge();

    // then
    expect(result).toBe(badge);
  });
});
