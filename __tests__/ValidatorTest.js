import { PERIOD, RANGE } from '../src/constants/constant.js';
import Validator from '../src/validator/Validator.js';
import ValidationError from '../src/validator/ValidationError.js';
import { ERROR } from '../src/constants/message.js';

describe('Validator 검증 테스트', () => {
  test(`예외 메세지는 ${ERROR.errorPrefix}로 시작해야한다.`, () => {
    expect(() => {
      throw new ValidationError();
    }).toThrow(ERROR.errorPrefix);
  });

  test.each([[1.2], ['3.14'], ['']])('입력값이 정수가 아니면 예외가 발생한다.', (input) => {
    expect(() => Validator.checkIsInteger(input)).toThrow(ERROR.invalidDate);
  });

  test.each([[1], [1000], [-1000]])('입력값이 정수이면 예외가 발생하지 않는다.', (input) => {
    expect(() => Validator.checkIsInteger(input)).not.toThrow(ERROR.invalidDate);
  });

  test.each([[PERIOD.promotion.start - 1], ['^0^'], [PERIOD.promotion.end + 1]])(
    `입력값이 ${PERIOD.promotion.start}}-${PERIOD.promotion.end} 사이의 값이 아니면 예외가 발생한다.`,
    (input) => {
      expect(() => Validator.checkIsValidDate(input)).toThrow(ERROR.invalidDate);
    },
  );

  test.each([[PERIOD.promotion.start], ['12'], [PERIOD.promotion.end]])(
    `입력값이 ${PERIOD.promotion.start}}-${PERIOD.promotion.end} 사이의 값이면 예외가 발생하지 않는다.`,
    (input) => {
      expect(() => Validator.checkIsValidDate(input)).not.toThrow(ERROR.invalidDate);
    },
  );

  test.each([[[1, 2, 3, 4, 3.14]], [[1, 'two']]])(
    '입력값 중 정수가 아닌 요소가 있으면 예외가 발생한다.',
    (inputs) => {
      expect(() => Validator.checkIsAllInteger(inputs)).toThrow(ERROR.invalidMenu);
    },
  );

  test.each([[[1, 2, 3, 4]], [[1, '2', 3, '4']]])(
    '입력값의 모든 요소가 정수이면 예외가 발생하지 않는다.',
    (inputs) => {
      expect(() => Validator.checkIsAllInteger(inputs)).not.toThrow(ERROR.invalidMenu);
    },
  );

  test.each([[['초코케이키']], [['샴페인', '초콜릿']]])(
    '입력값 중 메뉴에 있는 이름이 아닌 요소가 있으면 예외가 발생한다.',
    (inputs) => {
      expect(() => Validator.checkIsNameInMenu(inputs)).toThrow(ERROR.invalidMenu);
    },
  );

  test.each([[['초코케이크']], [['샴페인', '해산물파스타', '크리스마스파스타']]])(
    '입력값이 모두 메뉴에 있는 이름이면 예외가 발생하지 않는다.',
    (inputs) => {
      expect(() => Validator.checkIsNameInMenu(inputs)).not.toThrow(ERROR.invalidMenu);
    },
  );

  test.each([[RANGE.minLen - 1], [100], ['100'], [RANGE.maxLen + 1]])(
    `입력값이 ${RANGE.minLen}-${RANGE.maxLen} 사이의 값이 아니면 예외가 발생한다.`,
    (input) => {
      expect(() => Validator.checkIsValidTotalCount(input)).toThrow(ERROR.invalidMenu);
    },
  );
  test.each([[RANGE.minLen], [5], ['5'], [RANGE.maxLen]])(
    `입력값 ${RANGE.minLen}-${RANGE.maxLen} 사이의 값이면 예외가 발생하지 않는다.`,
    (input) => {
      expect(() => Validator.checkIsValidTotalCount(input)).not.toThrow(ERROR.invalidMenu);
    },
  );

  test.each([[[1, 2, 3, 4, 5, RANGE.minLen - 1]], [[1, 2, 3, RANGE.maxLen + 1]]])(
    `입력값의 요소 중 ${RANGE.minLen}-${RANGE.maxLen} 사이의 값이 아닌 수가 있다면 예외가 발생한다.`,
    (inputs) => {
      expect(() => Validator.checkIsValidCount(inputs)).toThrow(ERROR.invalidMenu);
    },
  );

  test.each([[[RANGE.minLen, 2, 3]], [[RANGE.maxLen, 1, 2]]])(
    `입력값의 모든 요소가 ${RANGE.minLen}-${RANGE.maxLen} 사이의 값이면 예외가 발생하지 않는다.`,
    (inputs) => {
      expect(() => Validator.checkIsValidCount(inputs)).not.toThrow(ERROR.invalidMenu);
    },
  );

  test.each([[['초코케이크', '샴페인', '초코케이크']], [['제로콜라', '제로콜라']]])(
    '입력값 중 중복되는 요소가 있으면 예외가 발생한다.',
    (inputs) => {
      expect(() => Validator.checkHasDuplicate(inputs)).toThrow(ERROR.invalidMenu);
    },
  );

  test.each([[['초코케이크', '샴페인', '타파스']], ['제로콜라']])(
    '입력값 중 중복되는 요소가 없으면 예외가 발생하지 않는다.',
    (inputs) => {
      expect(() => Validator.checkHasDuplicate(inputs)).not.toThrow(ERROR.invalidMenu);
    },
  );

  test.each([
    [[['샴페인', 2]]],
    [
      [
        ['제로콜라', 1],
        ['샴페인', 1],
        ['레드와인', 1],
      ],
    ],
  ])('입력값 중 음료에 해당하는 메뉴만 있으면 예외가 발생한다.', (inputs) => {
    // given
    const counts = inputs.map((menu) => Number(menu[1]));
    const countSum = counts.reduce((sum, count) => sum + Number(count), 0);

    // when / then
    expect(() => Validator.checkHasDrinkOnly(inputs, countSum)).toThrow(ERROR.invalidMenu);
  });
  test.each([
    [
      [
        ['샴페인', 2],
        ['타파스', 1],
      ],
    ],
    [
      [
        ['타파스', 3],
        ['크리스마스파스타', 2],
      ],
    ],
  ])('입력값의 요소가 음료만 있지 않다면 예외가 발생하지 않는다.', (inputs) => {
    // given
    const counts = inputs.map((menu) => Number(menu[1]));
    const countSum = counts.reduce((sum, count) => sum + Number(count), 0);

    // then
    expect(() => Validator.checkHasDrinkOnly(inputs, countSum)).not.toThrow(ERROR.invalidMenu);
  });
});
