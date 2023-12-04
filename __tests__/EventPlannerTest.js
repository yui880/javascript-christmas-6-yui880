import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';
import EventPlannerController from '../src/controller/EventPlannerController.js';
import { ERROR } from '../src/constant/message.js';

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

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe('클래스 테스트', () => {
  describe('예외 발생 후 재입력 테스트', () => {
    test('날짜에 잘못된 값이 입력되었을 떄 경고문 출력 후 다시 입력받는다.', async () => {
      // given
      mockQuestions(['', 'a', '0', '3.3', '11', '초코케이크-2']);
      const logSpy = getLogSpy();

      // when
      const eventPlanner = new EventPlannerController();
      await eventPlanner.play();

      // then
      const expected = [
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
        logMessage.includes(ERROR.date),
      ).length;

      expect(errorCount).toBe(4);
      expectLogContains(getOutput(logSpy), expected);
    });

    test('메뉴에 잘못된 값이 입력되었을 떄 경고문 출력 후 다시 입력받는다.', async () => {
      // given
      mockQuestions([
        '11',
        '초키케이크-1',
        '초코케이크-1,샴페인-100',
        '초코케이크-100',
        '!-^0^-!',
        '초코케이크-2,초코케이크-3',
        '샴페인-2',
        '초코케이크-2',
      ]);
      const logSpy = getLogSpy();

      // when
      const eventPlanner = new EventPlannerController();
      await eventPlanner.play();

      // then
      const expected = [
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
        logMessage.includes(ERROR.menu),
      ).length;

      expect(errorCount).toBe(6);
      expectLogContains(getOutput(logSpy), expected);
    });
  });
});
