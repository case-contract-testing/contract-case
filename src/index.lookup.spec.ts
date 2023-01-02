import { startContract } from 'boundaries';
import { anyNumber, anyString, namedMatch } from 'boundaries/dsl/Matchers';
import { stripMatchers } from 'boundaries/dsl/stripMatchers';
import { contractFns } from 'connectors/contract';
import { resultPrinter } from 'connectors/resultPrinter';
import { traversals } from 'diffmatch';

import { CaseConfigurationError } from 'entities';
import { applyDefaultContext } from 'entities/context';
import type { LoggableContext } from 'entities/context/types';
import type { Logger } from 'entities/logger/types';
import type {
  AnyCaseNodeOrData,
  AnyCaseNodeType,
  DataOrCaseNodeFor,
  MatchResult,
} from 'entities/types';

const coreCheckMatch = <T extends AnyCaseNodeType>(
  matcherOrData: DataOrCaseNodeFor<T>,
  actual: unknown,
  logger: (c: LoggableContext) => Logger
): Promise<MatchResult> =>
  Promise.resolve(
    traversals.descendAndCheck(
      matcherOrData,
      applyDefaultContext(
        matcherOrData,
        traversals,
        logger,
        contractFns,
        resultPrinter
      ),
      actual
    )
  );

const makeMockLogger = () => ({
  error(): void {},
  warn(): void {},
  info(): void {},
  debug(): void {},
  maintainerDebug(): void {},
  setLevel(): void {},
});

const expectErrorContaining = (
  matcher: AnyCaseNodeOrData,
  example: unknown,
  expectedContent: string
) => {
  describe(`when given ${example}`, () => {
    it(`returns an error containing '${expectedContent}'`, async () => {
      const matchResult = await coreCheckMatch(
        matcher,
        example,
        makeMockLogger
      );
      expect(matchResult).not.toHaveLength(0);
      expect(
        matchResult.map((m) => m.toString()).reduce((acc, m) => `${acc} ${m}`)
      ).toContain(expectedContent);
    });
  });
};

describe('named matches', () => {
  beforeAll(() => {
    startContract({ consumerName: 'consumer', providerName: 'provider' });
  });

  describe("named matcher that isn't defined yet", () => {
    const matcher = {
      a: namedMatch('some string'),
    };
    it('fails', async () => {
      await expect(
        coreCheckMatch(
          matcher,
          {
            a: 'other string',
          },
          makeMockLogger
        )
      ).rejects.toBeInstanceOf(CaseConfigurationError);
    });
  });
  describe('object matcher with a named matcher inside', () => {
    const matcher = {
      a: namedMatch('some string', anyString('string')),
    };
    it('accepts a matching object with different values', async () => {
      expect(
        await coreCheckMatch(
          matcher,
          {
            a: 'other string',
          },
          makeMockLogger
        )
      ).toStrictEqual([]);
    });
    it('strips to the expected example', () => {
      expect(stripMatchers(matcher)).toEqual({ a: 'string' });
    });
    expectErrorContaining(matcher, { a: 2 }, 'string');
  });
  describe('object matcher with repeated named matches', () => {
    const matcher = {
      a: namedMatch('some number', anyNumber(1)),
      b: namedMatch('some number'),
    };
    it('accepts a matching object with different values', async () => {
      expect(
        await coreCheckMatch(
          matcher,
          {
            a: 34,
            b: 2,
          },
          makeMockLogger
        )
      ).toStrictEqual([]);
    });
    expectErrorContaining(
      matcher,
      { a: 'some string', b: 'other string' },
      'is not a number'
    );
    expectErrorContaining(
      matcher,
      { a: 1, b: 'other string' },
      'is not a number'
    );
    it('strips to the expected example', () => {
      expect(stripMatchers(matcher)).toEqual({ a: 1, b: 1 });
    });
  });

  describe('object matcher with named matchers introduced earlier', () => {
    const repeatTests = (matcher: AnyCaseNodeOrData) => {
      it('accepts a matching object with different values', async () => {
        expect(
          await coreCheckMatch(
            matcher,
            {
              a: '1',
              b: 2,
            },
            makeMockLogger
          )
        ).toStrictEqual([]);
      });
      expectErrorContaining(
        matcher,
        { a: 'some string', b: 'other string' },
        'is not a number'
      );
      expectErrorContaining(
        matcher,
        { a: 1, b: 'other string' },
        'is not a string'
      );
      expectErrorContaining(
        matcher,
        { a: 1, b: 'other string' },
        'is not a number'
      );
      expectErrorContaining(
        matcher,
        { a: '1', b: 'other string' },
        'is not a number'
      );
      it('strips to the expected example', () => {
        expect(stripMatchers(matcher)).toEqual({ a: 'string', b: 1 });
      });
    };
    describe('when raw', () => {
      repeatTests({
        a: namedMatch('some string'),
        b: namedMatch('some number'),
      });
    });

    describe('when named', () => {
      repeatTests(
        namedMatch('object example', {
          a: namedMatch('some string'),
          b: namedMatch('some number'),
        })
      );
    });
    describe('when named without content', () => {
      repeatTests(namedMatch('object example'));
    });
  });
});
