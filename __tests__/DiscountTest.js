import Discount from '../src/domain/Discount.js';
import { DISCOUNT_EVENT, DISCOUNT_STANDARD, PERIOD } from '../src/constant.js';
import Product from '../src/domain/Product.js';

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
    {
      dessertCount: 1,
      mainCount: 2,
      day: 8, // 금요일
      output: 5746, // 주말 4046 + 크리스마스 1700
    },
    {
      dessertCount: 1,
      mainCount: 0,
      day: 10, // 일요일, 별
      output: 4923, // 평일 2023 + 크리스마스 1900 + 특별 1000
    },
  ])('총 할인 금액을 구하는 기능 테스트', ({ dessertCount, mainCount, day, output }) => {
    // given
    const productMock = getCustomProductMock({
      isPriceLessThan: false,
      dessertOrderCount: dessertCount,
      mainOrderCount: mainCount,
    });
    discount.apply(productMock, day);

    // when
    const result = discount.getAmount();

    // then
    expect(result).toBe(output);
  });

  test.each([
    {
      dessertCount: 1,
      mainCount: 2,
      day: 8, // 금요일
      output: false,
    },
    {
      dessertCount: 0,
      mainCount: 0,
      day: 10,
      output: false,
    },
  ])(
    '총 할인 금액이 0인지 아닌지 구하는 기능 테스트',
    ({ dessertCount, mainCount, day, output }) => {
      // given
      const productMock = getCustomProductMock({
        isPriceLessThan: false,
        dessertOrderCount: dessertCount,
        mainOrderCount: mainCount,
      });
      discount.apply(productMock, day);

      // when
      const result = discount.isEmpty();

      // then
      expect(result).toBe(output);
    },
  );

  test.each([
    {
      day: 1,
      dayOfWeek: 5, // 금요일
    },
    {
      day: 31,
      dayOfWeek: 0, // 일요일
    },
  ])('날짜를 입력하면 무슨 요일인지 알려주는 기능 테스트(12월 한정)', ({ day, dayOfWeek }) => {
    // when
    const result = discount.getDayOfWeek(day);

    // then
    expect(result).toBe(dayOfWeek);
  });
});

describe('Discount 할인 이벤트 테스트', () => {
  let discount;

  beforeEach(() => {
    discount = new Discount();
  });

  afterEach(() => {
    jest.clearAllMocks();
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

      // then
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

      // then
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

      // then
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

      // then
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

    // then
    expect(result).toBe(output);
  });

  test.each([
    { day: 1, output: 0 },
    { day: 30, output: 0 },
  ])('별이 없는 날일 때 특별할인이 적용되지 않는 테스트', ({ day, output }) => {
    // given
    const productMock = getCustomProductMock({
      isPriceLessThan: false,
    });
    discount.apply(productMock, day);

    // when
    const result = discount.getAmountByEvent()[3];

    // then
    expect(result).toBe(output);
  });

  test.each([
    {
      dessertCount: 1,
      mainCount: 2,
      day: 8, // 금요일
      output: [1700, 0, 4046, 0], // 주말 4046 + 크리스마스 1700
    },
    {
      dessertCount: 1,
      mainCount: 0,
      day: 10, // 일요일, 별
      output: [1900, 2023, 0, 1000], // 평일 2023 + 크리스마스 1900 + 특별 1000
    },
  ])(
    '여러가지 할인 이벤트가 제대로 적용되는지 테스트',
    ({ dessertCount, mainCount, day, output }) => {
      // given
      const productMock = getCustomProductMock({
        isPriceLessThan: false,
        dessertOrderCount: dessertCount,
        mainOrderCount: mainCount,
      });
      discount.apply(productMock, day);

      // when
      const result = discount.getAmountByEvent();

      // then
      expect(result).toEqual(output);
    },
  );

  test.each([
    {
      product: new Product([['아이스크림', 1]]), //
      output: [0, 0, 0, 0],
    },
    {
      product: new Product([
        ['양송이수프', 1],
        ['제로콜라', 1],
      ]),
      output: [0, 0, 0, 0],
    },
  ])(
    `총 가격이 ${DISCOUNT_STANDARD.minimum}을 넘지 않으면 이벤트가 적용되지 않는지 테스트`,
    ({ product, output }) => {
      // given
      discount.apply(product, 1);

      // when
      const result = discount.getAmountByEvent();

      // then
      expect(result).toEqual(output);
    },
  );
});
