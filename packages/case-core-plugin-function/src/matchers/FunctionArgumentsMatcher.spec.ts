import {
  CoreFunctionArgumentsMatcher,
  FUNCTION_ARGUMENTS_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-function-dsl';
import {
  CaseConfigurationError,
  CaseCoreError,
  MatchContext,
} from '@contract-case/case-plugin-base';
import { FunctionArgumentMatcherExecutor } from './FunctionArgumentsMatcher';

describe('FunctionArgumentMatcherExecutor', () => {
  const mockMatchContext = {
    descendAndStrip: jest.fn(),
    descendAndDescribe: jest.fn(),
    descendAndCheck: jest.fn(),
    descendAndValidate: jest.fn(),
    logger: {
      maintainerDebug: jest.fn(),
      error: jest.fn(),
    },
    '_case:currentRun:context:pluginProvided': {
      functionName: 'mockFunction',
    },
  } as unknown as MatchContext;

  const matcher: CoreFunctionArgumentsMatcher = {
    '_case:matcher:type': FUNCTION_ARGUMENTS_MATCHER_TYPE,
    arguments: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('description function', () => {
    it('describes an invocation with no arguments', () => {
      expect(
        FunctionArgumentMatcherExecutor.describe(matcher, mockMatchContext),
      ).toBe('An invocation of mockFunction()');
    });

    it('describes an invocation with arguments', () => {
      const argsMatcher = {
        ...matcher,
        arguments: [{ 'case:matcher:type': 'some-matcher' }],
      };
      (mockMatchContext.descendAndDescribe as jest.Mock).mockReturnValue(
        'some description',
      );

      expect(
        FunctionArgumentMatcherExecutor.describe(argsMatcher, mockMatchContext),
      ).toBe('An invocation of mockFunction( some description )');
    });
  });

  describe('check', () => {
    it('throws configuration error if actual is missing', async () => {
      await expect(
        FunctionArgumentMatcherExecutor.check(
          matcher,
          mockMatchContext,
          undefined,
        ),
      ).rejects.toThrow(CaseConfigurationError);
    });

    it('throws core error if actual is not an array', async () => {
      await expect(
        FunctionArgumentMatcherExecutor.check(
          matcher,
          mockMatchContext,
          'not-an-array',
        ),
      ).rejects.toThrow(CaseCoreError);
    });

    it('checks arguments when lengths match', async () => {
      const argsMatcher = {
        ...matcher,
        arguments: [{ 'case:matcher:type': 'some-matcher' }],
      };
      const actual = ['some-arg'];
      (mockMatchContext.descendAndCheck as jest.Mock).mockResolvedValue([]);

      const result = await FunctionArgumentMatcherExecutor.check(
        argsMatcher,
        mockMatchContext,
        actual,
      );

      expect(mockMatchContext.descendAndCheck).toHaveBeenCalledWith(
        argsMatcher.arguments[0],
        expect.anything(),
        actual[0],
      );
      expect(result).toEqual([]);
    });

    it('returns error when lengths do not match', async () => {
      const argsMatcher = {
        ...matcher,
        arguments: [{ 'case:matcher:type': 'some-matcher' }],
      };
      const actual: unknown[] = [];
      (mockMatchContext.descendAndStrip as jest.Mock).mockReturnValue(
        'stripped-expected',
      );

      const result = await FunctionArgumentMatcherExecutor.check(
        argsMatcher,
        mockMatchContext,
        actual,
      );

      expect(result).toHaveLength(1);
      expect(result[0]?.message).toContain(
        'The function expected 1 argument, but received 0 arguments',
      );
    });
  });

  describe('strip', () => {
    it('strips arguments', () => {
      (mockMatchContext.descendAndStrip as jest.Mock).mockReturnValue([
        'stripped',
      ]);
      expect(
        FunctionArgumentMatcherExecutor.strip(matcher, mockMatchContext),
      ).toEqual(['stripped']);
      expect(mockMatchContext.descendAndStrip).toHaveBeenCalledWith(
        matcher.arguments,
        expect.anything(),
      );
    });
  });

  describe('validate', () => {
    it('validates arguments', async () => {
      await FunctionArgumentMatcherExecutor.validate(matcher, mockMatchContext);
      expect(mockMatchContext.descendAndValidate).toHaveBeenCalledWith(
        matcher.arguments,
        expect.anything(),
      );
    });

    it('throws if arguments are missing', async () => {
      const invalidMatcher = {
        ...matcher,
        arguments: undefined,
      } as unknown as CoreFunctionArgumentsMatcher;
      await expect(
        FunctionArgumentMatcherExecutor.validate(
          invalidMatcher,
          mockMatchContext,
        ),
      ).rejects.toThrow(CaseConfigurationError);
    });

    it('throws if arguments are not an array', async () => {
      const invalidMatcher = {
        ...matcher,
        arguments: 'not-an-array',
      } as unknown as CoreFunctionArgumentsMatcher;
      await expect(
        FunctionArgumentMatcherExecutor.validate(
          invalidMatcher,
          mockMatchContext,
        ),
      ).rejects.toThrow(CaseConfigurationError);
    });
  });
});
