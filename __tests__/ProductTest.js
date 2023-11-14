import Product from '../src/domain/Product.js';
import { CATEGORY, ERROR, RANGE } from '../src/constant.js';

describe('Product 클래스 테스트', () => {
  let product;

  test.each([
    {
      menu: [
        ['초코케이크', 2],
        ['제로콜라', 1],
      ],
      count: [0, 0, 2, 1],
    },
    {
      menu: [
        ['양송이수프', 1],
        ['아이스크림', 3],
        ['초코케이크', 2],
      ],
      count: [1, 0, 5, 0],
    },
    {
      menu: [
        ['타파스', 1],
        ['티본스테이크', 1],
        ['초코케이크', 1],
        ['레드와인', 1],
      ],
      count: [1, 1, 1, 1],
    },
  ])('카테고리 별로 메뉴의 개수를 세서 저장하는 기능(구매하는 기능) 테스트', ({ menu, count }) => {
    // given
    product = new Product(menu);

    // when
    const result = CATEGORY.map((category) => product.getCountByCategory(category));

    // then
    expect(result).toEqual(count);
  });

  test.each([
    {
      menu: [
        ['초코케이크', 2],
        ['제로콜라', 1],
      ],
      totalPrice: 33_000,
    },
    {
      menu: [
        ['양송이수프', 1],
        ['아이스크림', 3],
        ['초코케이크', 2],
      ],
      totalPrice: 51_000,
    },
    {
      menu: [
        ['타파스', 1],
        ['티본스테이크', 1],
        ['초코케이크', 1],
        ['레드와인', 1],
      ],
      totalPrice: 135_500,
    },
  ])('총 주문 금액을 계산하는 기능 테스트', ({ menu, totalPrice }) => {
    // given
    product = new Product(menu);

    // when
    const result = product.getTotalPrice();

    // then
    expect(result).toEqual(totalPrice);
  });

  test.each([
    {
      menu: [
        ['초코케이크', 2],
        ['제로콜라', 1],
      ],
      inputPrice: 30000,
      isPriceLessThan: false,
    },
    {
      menu: [
        ['양송이수프', 1],
        ['아이스크림', 3],
        ['초코케이크', 2],
      ],
      inputPrice: 60000,
      isPriceLessThan: true,
    },
    {
      menu: [
        ['타파스', 1],
        ['티본스테이크', 1],
        ['초코케이크', 1],
        ['레드와인', 1],
      ],
      inputPrice: 135_500,
      isPriceLessThan: false,
    },
  ])(
    '총 주문 금액이 입력값보다 작은지 확인하는 기능 테스트',
    ({ menu, inputPrice, isPriceLessThan }) => {
      // given
      product = new Product(menu);

      // when
      const result = product.isPriceLessThan(inputPrice);

      // then
      expect(result).toBe(isPriceLessThan);
    },
  );
});

describe('Product 클래스 검증 테스트', () => {
  test.each([
    [
      [
        ['라면', 2],
        ['타파스', 1],
      ],
    ],
    [[['특제타파스', 2]]],
  ])('메뉴판에 있지 않은 음식의 이름이 입력되면 예외가 발생한다.', (menu) => {
    // when / then
    expect(() => {
      new Product(menu);
    }).toThrow(ERROR.invalidMenu);
  });

  test.each([
    [
      [
        ['아이스크림', 1],
        ['양송이수프', 1],
      ],
    ],
    [[['타파스', 2]]],
  ])('메뉴판에 있는 음식의 이름이 입력되면 예외가 발생하지 않는다.', (menu) => {
    // when / then
    expect(() => {
      new Product(menu);
    }).not.toThrow(ERROR.invalidMenu);
  });

  test.each([
    [[['아이스크림', '5개 주세요!']]],
    [[['타파스', 'five']]],
    [[['초코케이크', '1,000']]],
  ])('주문한 메뉴의 수량이 숫자가 아니면 예외가 발생한다.', (menu) => {
    // when / then
    expect(() => {
      new Product(menu);
    }).toThrow(ERROR.invalidMenu);
  });

  test.each([
    [[['아이스크림', RANGE.minLen - 1]]],
    [[['타파스', -12]]],
    [[['초코케이크', RANGE.maxLen + 1]]],
  ])(
    `주문한 메뉴의 각 수량이 ${RANGE.minLen} 이상 ${RANGE.maxLen} 이하의 숫자가 아니면 예외가 발생한다.`,
    (menu) => {
      // when / then
      expect(() => {
        new Product(menu);
      }).toThrow(ERROR.invalidMenu);
    },
  );

  test.each([
    [[['아이스크림', RANGE.minLen]]],
    [
      [
        ['티본스테이크', 12],
        ['제로콜라', 7],
      ],
    ],
    [[['초코케이크', RANGE.maxLen]]],
  ])(
    `주문한 메뉴의 각 수량이 ${RANGE.minLen} 이상 ${RANGE.maxLen} 이하의 숫자면 예외가 발생하지 않는다.`,
    (menu) => {
      // when / then
      expect(() => {
        new Product(menu);
      }).not.toThrow(ERROR.invalidMenu);
    },
  );

  test.each([
    [
      [
        ['아이스크림', RANGE.maxLen],
        ['티본스테이크', 1],
      ],
    ],
    [
      [
        ['초코케이크', 3],
        ['레드와인', 19],
      ],
    ],
  ])(
    `주문한 메뉴의 총 수량이 ${RANGE.minLen}개 이상 ${RANGE.maxLen}개 이하가 아니면 예외가 발생한다.`,
    (menu) => {
      // when / then
      expect(() => {
        new Product(menu);
      }).toThrow(ERROR.invalidMenu);
    },
  );

  test.each([
    [
      [
        ['아이스크림', 1],
        ['티본스테이크', 1],
      ],
    ],
    [
      [
        ['초코케이크', 3],
        ['레드와인', 17],
      ],
    ],
  ])(
    `주문한 메뉴의 총 수량이 ${RANGE.minLen}개 이상 ${RANGE.maxLen}개 이하면 예외가 발생하지 않는다.`,
    (menu) => {
      // when / then
      expect(() => {
        new Product(menu);
      }).not.toThrow(ERROR.invalidMenu);
    },
  );

  test.each([
    [[['제로콜라', 3]]],
    [
      [
        ['레드와인', 2],
        ['샴페인', 3],
      ],
    ],
  ])('음료만 주문시 예외가 발생한다.', (menu) => {
    // when / then
    expect(() => {
      new Product(menu);
    }).toThrow(ERROR.invalidMenu);
  });

  test.each([
    [
      [
        ['제로콜라', 3],
        ['타파스', 2],
      ],
    ],
    [
      [
        ['해산물파스타', 1],
        ['레드와인', 2],
        ['샴페인', 3],
      ],
    ],
  ])('음료와 다른 메뉴를 같이 주문시 예외가 발생하지 않는다.', (menu) => {
    // when / then
    expect(() => {
      new Product(menu);
    }).not.toThrow(ERROR.invalidMenu);
  });

  test.each([
    [
      [
        ['타파스', 3],
        ['타파스', 2],
      ],
    ],
    [
      [
        ['해산물파스타', 1],
        ['레드와인', 2],
        ['해산물파스타', 1],
      ],
    ],
  ])('중복된 메뉴를 주문하는 경우 예외가 발생한다.', (menu) => {
    // when / then
    expect(() => {
      new Product(menu);
    }).toThrow(ERROR.invalidMenu);
  });

  test.each([
    [
      [
        ['타파스', 1],
        ['양송이수프', 7],
      ],
    ],
    [
      [
        ['해산물파스타', 1],
        ['레드와인', 2],
      ],
    ],
  ])('중복되지 않은 메뉴를 주문하는 경우 예외가 발생하지 않는다.', (menu) => {
    // when / then
    expect(() => {
      new Product(menu);
    }).not.toThrow(ERROR.invalidMenu);
  });
});
