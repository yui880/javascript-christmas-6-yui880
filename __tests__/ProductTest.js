import Product from '../src/domain/Product.js';
import { CATEGORY } from '../src/constant.js';

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
