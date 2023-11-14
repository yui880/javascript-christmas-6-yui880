import { DISCOUNT_STANDARD } from '../src/constant.js';
import Product from '../src/domain/Product.js';
import Gift from '../src/domain/Gift.js';

const getCustomProductMock = ({ isPriceLessThan = false }) => ({
  isPriceLessThan: jest.fn(() => isPriceLessThan),
});

describe('Gift 클래스 테스트 - 다른 클래스 메서드 mock으로 대체', () => {
  let gift;

  beforeEach(() => {
    gift = new Gift();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    { isPriceLessThan: true, giftCount: 0 },
    { isPriceLessThan: false, giftCount: 1 },
  ])('총 주문 금액에 따른 증정 이벤트 적용 여부 테스트', ({ isPriceLessThan, giftCount }) => {
    // given
    const productMock = getCustomProductMock({ isPriceLessThan });
    gift.apply(productMock);

    // when
    const result = gift.getCount();

    // then
    expect(result).toBe(giftCount);
  });

  test.each([
    { isPriceLessThan: true, isEmpty: true },
    { isPriceLessThan: false, isEmpty: false },
  ])(
    '총 주문 금액에 따라 증정이 되는지 아닌지 확인하는 기능 테스트',
    ({ isPriceLessThan, isEmpty }) => {
      // given
      const productMock = getCustomProductMock({ isPriceLessThan });
      gift.apply(productMock);

      // when
      const result = gift.isEmpty();

      // then
      expect(result).toBe(isEmpty);
    },
  );
});

describe('Gift 클래스 테스트 - 다른 클래스 이용해서 테스트', () => {
  let gift;

  beforeEach(() => {
    gift = new Gift();
  });

  test.each([
    {
      product: new Product([
        ['타파스', 2],
        ['해산물파스타', 1],
        ['바비큐립', 3],
      ]),
      giftCount: 1,
    },
    {
      product: new Product([['티본스테이크', 3]]),
      giftCount: 1,
    },
  ])(
    `금액이 ${DISCOUNT_STANDARD.minimumForGift} 이상일 때 증정 이벤트가 잘 적용되는지 테스트`,
    ({ product, giftCount }) => {
      // given
      gift.apply(product);

      // when
      const result = gift.getCount();

      // then
      expect(result).toBe(giftCount);
    },
  );
  test.each([
    {
      product: new Product([['양송이수프', 1]]),
      giftCount: 0,
    },
    {
      product: new Product([['초코케이크', 4]]),
      giftCount: 0,
    },
  ])(
    `금액이 ${DISCOUNT_STANDARD.minimumForGift}보다 작을 때 증정 이벤트가 적용되지 않는지 테스트`,
    ({ product, giftCount }) => {
      // given
      gift.apply(product);

      // when
      const result = gift.getCount();

      // then
      expect(result).toBe(giftCount);
    },
  );
  test.each([
    { product: new Product([['해산물파스타', 10]]), isEmpty: false },
    { product: new Product([['해산물파스타', 1]]), isEmpty: true },
  ])(
    `주문 금액이 ${DISCOUNT_STANDARD.minimumForGift}보다 크거나 작을 떄 증정이 되었는지 확인하는 기능 테스트`,
    ({ product, isEmpty }) => {
      // given
      gift.apply(product);

      // when
      const result = gift.isEmpty();

      // then
      expect(result).toBe(isEmpty);
    },
  );
});
