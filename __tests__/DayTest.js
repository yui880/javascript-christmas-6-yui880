import Day from '../src/domain/Day.js';
import { ERROR } from '../src/constants/message.js';

describe('Day 클래스 테스트', () => {
  let day;

  test.each([
    {
      dayNumber: 1,
      dayOfWeek: 5, // 금요일
    },
    {
      dayNumber: 11,
      dayOfWeek: 1, // 월요일
    },
    {
      dayNumber: 31,
      dayOfWeek: 0, // 일요일
    },
  ])('날짜 입력시 12월 기준으로 요일을 잘 반환하는지 테스트', ({ dayNumber, dayOfWeek }) => {
    // when
    day = new Day(dayNumber);
    const result = day.getDayOfWeek();

    // then
    expect(result).toBe(dayOfWeek);
  });

  test.each([
    {
      dayNumber: 1,
      christmas: true,
    },
    {
      dayNumber: 11,
      christmas: true,
    },
    {
      dayNumber: 31,
      christmas: false,
    },
  ])(
    '날짜가 크리스마스 이벤트 기간에 해당하는지 확인하는 기능 테스트',
    ({ dayNumber, christmas }) => {
      // when
      day = new Day(dayNumber);
      const result = day.isChristmasDay();

      // then
      expect(result).toBe(christmas);
    },
  );

  test.each([
    {
      dayNumber: 4, // 월
      weekday: true,
    },
    {
      dayNumber: 14, // 목
      weekday: true,
    },
    {
      dayNumber: 22, // 금
      weekday: false,
    },
  ])('날짜가 평일인지(일-목)확인하는 기능 테스트', ({ dayNumber, weekday }) => {
    // when
    day = new Day(dayNumber);
    const result = day.isWeekday();

    // then
    expect(result).toBe(weekday);
  });

  test.each([
    {
      dayNumber: 2, // 토
      weekend: true,
    },
    {
      dayNumber: 22, // 금
      weekend: true,
    },
    {
      dayNumber: 25, // 월
      weekend: false,
    },
  ])('날짜가 주말인지(금,토)확인하는 기능 테스트', ({ dayNumber, weekend }) => {
    // when
    day = new Day(dayNumber);
    const result = day.isWeekend();

    // then
    expect(result).toBe(weekend);
  });

  test.each([
    {
      dayNumber: 3,
      special: true,
    },
    {
      dayNumber: 24,
      special: true,
    },
    {
      dayNumber: 1,
      special: false,
    },
  ])('날짜가 특별 이벤트 기간인지 확인하는 기능 테스트', ({ dayNumber, special }) => {
    // when
    day = new Day(dayNumber);
    const result = day.isSpecialDay();

    // then
    expect(result).toBe(special);
  });

  test.each([
    {
      dayNumber: 1,
      discountAmount: 1000,
    },
    {
      dayNumber: 25,
      discountAmount: 3400,
    },
  ])(
    '날짜 기준으로 크리스마스 이벤트 할인 금액을 구하는 기능 테스트',
    ({ dayNumber, discountAmount }) => {
      // when
      day = new Day(dayNumber);
      const result = day.getChristmasDiscountAmount();

      // then
      expect(result).toBe(discountAmount);
    },
  );
});

describe('Day 클래스 검증 테스트', () => {
  test.each([[3.14], [0.99], [''], ['yuna']])(
    '날짜가 정수가 아니면 예외가 발생한다.',
    (dayNumber) => {
      expect(() => {
        new Day(dayNumber);
      }).toThrow(ERROR.invalidDate);
    },
  );

  test.each([[3], ['22'], [25]])('날짜가 정수면 예외가 발생하지 않는다.', (dayNumber) => {
    expect(() => {
      new Day(dayNumber);
    }).not.toThrow(ERROR.invalidDate);
  });

  test.each([[0], [32], ['1000']])(
    '날짜가 1-31 사이의 숫자가 아니면 예외가 발생한다.',
    (dayNumber) => {
      expect(() => {
        new Day(dayNumber);
      }).toThrow(ERROR.invalidDate);
    },
  );

  test.each([[1], [31], [10]])(
    '날짜가 1-31 사이의 숫자이면 예외가 발생하지 않는다.',
    (dayNumber) => {
      expect(() => {
        new Day(dayNumber);
      }).not.toThrow(ERROR.invalidDate);
    },
  );
});
