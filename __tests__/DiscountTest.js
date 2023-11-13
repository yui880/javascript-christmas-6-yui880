import Discount from '../src/domain/Discount.js';
import { DISCOUNT_EVENT, PERIOD } from '../src/constant.js';

const getCustomProductMock = ({
  isPriceLessThan = false,
  dessertOrderCount = 0,
  mainOrderCount = 0,
}) => ({
  isPriceLessThan: jest.fn(() => isPriceLessThan),
  getDessertOrderCount: jest.fn(() => dessertOrderCount),
  getMainOrderCount: jest.fn(() => mainOrderCount),
});

describe('Discount 클래스 테스트', () => {
  let discount;

  beforeEach(() => {
    discount = new Discount();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('인스턴스 생성시 할인 금액 배열이 0으로 초기화 되는지 테스트', () => {
    // when
    const amountList = discount.getAmountByEvent();

    // then
    const expectedResult = new Array(Object.keys(DISCOUNT_EVENT).length).fill(0);
    expect(amountList).toEqual(expectedResult);
  });

  test.each([
    { day: PERIOD.christmas.start, output: 1000 },
    { day: '12', output: 2100 },
    { day: PERIOD.christmas.end, output: 3400 },
  ])(
    `날짜가 ${PERIOD.christmas.start}-${PERIOD.christmas.end}일 때 크리스마스 할인 이벤트가 날짜에 맞게 적용되는지 테스트`,
    ({ day, output }) => {
      // given
      const productMock = getCustomProductMock({ isPriceLessThan: false });
      discount.apply(productMock, day);

      // when
      const result = discount.getAmountByEvent()[0];
      expect(result).toBe(output);
    },
  );

  test.each([
    { day: PERIOD.christmas.start - 1, output: 0 },
    { day: PERIOD.christmas.end + 1, output: 0 },
  ])(
    `날짜가 ${PERIOD.christmas.start}-${PERIOD.christmas.end}가 아닐 때 크리스마스 이벤트가 적용되지 않는지 테스트`,
    ({ day, output }) => {
      // given
      const productMock = getCustomProductMock({ isPriceLessThan: false });
      discount.apply(productMock, day);

      // when
      const result = discount.getAmountByEvent()[0];
      expect(result).toBe(output);
    },
  );

  test.each([
    { dessertCount: 1, day: 3, output: 2023 },
    { dessertCount: 3, day: 7, output: 6069 },
  ])(
    '평일일 때(일-목) 평일 할인 이벤트인가 디저트 개수만큼 적용되는지 테스트',
    ({ dessertCount, day, output }) => {
      // given
      const productMock = getCustomProductMock({
        isPriceLessThan: false,
        dessertOrderCount: dessertCount,
      });
      discount.apply(productMock, day);

      // when
      const result = discount.getAmountByEvent()[1];
      expect(result).toBe(output);
    },
  );

  test.each([
    { dessertCount: 1, day: 2, output: 0 },
    { dessertCount: 3, day: 8, output: 0 },
  ])(
    '평일이 아닐 때(금-토) 평일 할인 이벤트가 적용되지 않는지 테스트',
    ({ dessertCount, day, output }) => {
      // given
      const productMock = getCustomProductMock({
        isPriceLessThan: false,
        dessertOrderCount: dessertCount,
      });
      discount.apply(productMock, day);

      // when
      const result = discount.getAmountByEvent()[1];
      expect(result).toBe(output);
    },
  );

  test.each([
    { mainCount: 1, day: 2, output: 2023 },
    { mainCount: 3, day: 8, output: 6069 },
  ])(
    '주말일 때(금-토) 주말 할인 이벤트가 메인의 개수만큼 적용되는지 테스트',
    ({ mainCount, day, output }) => {
      // given
      const productMock = getCustomProductMock({
        isPriceLessThan: false,
        mainOrderCount: mainCount,
      });
      discount.apply(productMock, day);

      // when
      const result = discount.getAmountByEvent()[2];
      expect(result).toBe(output);
    },
  );

  test.each([
    { mainCount: 1, day: 3, output: 0 },
    { mainCount: 3, day: 7, output: 0 },
  ])(
    '주말이 아닐 때(일-목) 주말 할인 이벤트가 적용되지 않는지 테스트',
    ({ mainCount, day, output }) => {
      // given
      const productMock = getCustomProductMock({
        isPriceLessThan: false,
        mainOrderCount: mainCount,
      });
      discount.apply(productMock, day);

      // when
      const result = discount.getAmountByEvent()[2];
      expect(result).toBe(output);
    },
  );

  test.each([
    { day: 24, output: 1000 },
    { day: 25, output: 1000 },
  ])('별이 있는 날일 때 특별할인이 적용되는지 테스트', ({ day, output }) => {
    // given
    const productMock = getCustomProductMock({
      isPriceLessThan: false,
    });
    discount.apply(productMock, day);

    // when
    const result = discount.getAmountByEvent()[3];
    expect(result).toBe(output);
  });

  test.each([
    { day: 1, output: 0 },
    { day: 30, output: 0 },
  ])('별이 있는 날일 때 특별할인이 적용되는지 테스트', ({ day, output }) => {
    // given
    const productMock = getCustomProductMock({
      isPriceLessThan: false,
    });
    discount.apply(productMock, day);

    // when
    const result = discount.getAmountByEvent()[3];
    expect(result).toBe(output);
  });
});
