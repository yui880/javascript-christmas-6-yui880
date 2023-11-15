import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';
import EventPlanner from '../src/controller/EventPlanner.js';
import { ERROR } from '../src/constants/message.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => [...logSpy.mock.calls].join(LINE_SEPARATOR);

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe('EventPlanner 클래스 테스트', () => {
  test.each([
    {
      inputs: ['11', '초코케이크-2'],
      expected: [
        '12월 11일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '초코케이크 2개',
        '30,000원',
        '없음',
        '크리스마스 디데이 할인: -2,000원',
        '평일 할인: -4,046원',
        '-6,046원',
        '23,954원',
        '별',
      ],
    },
    {
      inputs: ['3', '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1'],
      expected: [
        '12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '티본스테이크 1개',
        '바비큐립 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '142,000원',
        '샴페인 1개',
        '크리스마스 디데이 할인: -1,200원',
        '평일 할인: -4,046원',
        '특별 할인: -1,000원',
        '증정 이벤트: -25,000원',
        '-31,246원',
        '135,754원',
        '산타',
      ],
    },
    {
      inputs: ['26', '타파스-1,제로콜라-1'],
      expected: [
        '12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '타파스 1개',
        '제로콜라 1개',
        '8,500원',
        '없음',
        '없음',
        '0원',
        '8,500원',
        '없음',
      ],
    },
  ])('이벤트 플래너가 제대로 작동하는 경우 테스트', async ({ inputs, expected }) => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(inputs);

    // when
    const eventPlanner = new EventPlanner();
    await eventPlanner.run();

    // then
    expectLogContains(getOutput(logSpy), expected);
  });

  test('날짜 입력값에 예외가 발생하고 다시 입력받아 진행하는 경우 테스트', async () => {
    // given
    const inputs = ['0', '3.14', '32', '11', '초코케이크-2'];
    const logSpy = getLogSpy();
    mockQuestions(inputs);

    // when
    const eventPlanner = new EventPlanner();
    await eventPlanner.run();

    // then
    const expected = [
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
      '12월 11일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '초코케이크 2개',
      '30,000원',
      '없음',
      '크리스마스 디데이 할인: -2,000원',
      '평일 할인: -4,046원',
      '-6,046원',
      '23,954원',
      '별',
    ];

    const errorCount = logSpy.mock.calls.filter(([logMessage]) =>
      logMessage.includes(ERROR.invalidDate),
    ).length;

    expect(errorCount).toBe(3);
    expectLogContains(getOutput(logSpy), expected);
  });

  test('메뉴 입력값에 예외가 발생하고 다시 입력받아 진행하는 경우 테스트', async () => {
    // given
    const inputs = [
      '11',
      '초코케이크~2', // 옳지않은 형식
      '초코케이키-2', // 메뉴에 없는 음식
      '초코케이크-2개', // 유효한 숫자가 아님
      '초코케이크-0', // 유효한 숫자가 아님
      '초코케이크-21', // 총 개수가 20개를 넘어감
      '초코케이크-1,초코케이크-1', // 중복된 메뉴
      '제로콜라-1,샴페인-1', // 음료만 주문
      '초코케이크-2',
    ];
    const logSpy = getLogSpy();
    mockQuestions(inputs);

    // when
    const eventPlanner = new EventPlanner();
    await eventPlanner.run();

    // then
    const expected = [
      '12월 11일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요',
      '초코케이크 2개',
      '30,000원',
      '없음',
      '크리스마스 디데이 할인: -2,000원',
      '평일 할인: -4,046원',
      '-6,046원',
      '23,954원',
      '별',
    ];

    const errorCount = logSpy.mock.calls.filter(([logMessage]) =>
      logMessage.includes(ERROR.invalidMenu),
    ).length;

    expect(errorCount).toBe(7);
    expectLogContains(getOutput(logSpy), expected);
  });
});
