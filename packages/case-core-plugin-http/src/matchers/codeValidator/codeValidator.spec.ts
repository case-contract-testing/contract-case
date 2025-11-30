import {
  CaseConfigurationError,
  DataContext,
  Logger,
  MatchContext,
} from '@contract-case/case-plugin-base';
import { validateCodes } from './codeValidator';

const EMPTY_LOGGER = {
  error(): Promise<void> {
    return Promise.resolve();
  },
  warn(): Promise<void> {
    return Promise.resolve();
  },
  debug(): Promise<void> {
    return Promise.resolve();
  },
  maintainerDebug(): Promise<void> {
    return Promise.resolve();
  },
  deepMaintainerDebug(): Promise<void> {
    return Promise.resolve();
  },
};

const EMPTY_DATA_CONTEXT: DataContext = {
  '_case:currentRun:context:logLevel': 'none',
  '_case:currentRun:context:parentVersions': [],
  '_case:currentRun:context:location': ['DURING_TESTS'],
  '_case:currentRun:context:connectorClient': 'Tests',
  '_case:context:matchBy': 'type',
  '_case:context:serialisableTo': 'json',
  '_case:currentRun:context:contractMode': 'write',
  '_case:currentRun:context:contractsToWrite': ['hash', 'main'],
  '_case:currentRun:context:printResults': true,
  '_case:currentRun:context:testName': '',
  '_case:currentRun:context:variables': {},
  '_case:currentRun:context:defaultConfig': {},
  '_case:currentRun:context:autoVersionFrom': 'TAG',
  logger: EMPTY_LOGGER,
  resultPrinter: {
    printError: () => 'PRINT_ERROR',
    printFailureTitle: () => 'PRINT_FAILURE',
    printSuccessTitle: () => 'PRINT_SUCCESS',
    printDownloadedContract: () => 'PRINT_DOWNLOADED_CONTRACT',
  },
  makeLogger(): Logger {
    return EMPTY_LOGGER;
  },
} as const;

const MOCK_LOOKUP = {
  lookupMatcher: () => [],
  saveLookupableMatcher: () => {},
  addDefaultVariable: (): [name: string, value: string] => ['name', 'value'],
  addStateVariable: (): [name: string, value: string] => ['name', 'value'],
  lookupVariable: () => 'TEST VALUE',
  invokeFunctionByHandle: () => Promise.resolve('returnValue'),
};

const createMockMatchContext = (): MatchContext =>
  ({
    ...EMPTY_DATA_CONTEXT,
    descendAndCheck: () => Promise.resolve([]),
    descendAndStrip: () => 'stripped',
    descendAndDescribe: () => 'description',
    selfVerify: () => Promise.resolve(),
    ...MOCK_LOOKUP,
    makeLookup: () => MOCK_LOOKUP,
    descendAndValidate: () => Promise.resolve(),
  }) as MatchContext;

describe('validateCodes()', () => {
  let mockMatchContext: MatchContext;

  beforeEach(() => {
    mockMatchContext = createMockMatchContext();
  });

  describe('when given a single number', () => {
    describe('when the number is valid', () => {
      it('returns the number', () => {
        expect(validateCodes(200, mockMatchContext)).toBe(200);
        expect(validateCodes(100, mockMatchContext)).toBe(100);
        expect(validateCodes(599, mockMatchContext)).toBe(599);
      });
    });

    describe('when the number is less than 100', () => {
      it('throws a configuration error', () => {
        expect(() => validateCodes(99, mockMatchContext)).toThrow(
          CaseConfigurationError,
        );
        expect(() => validateCodes(99, mockMatchContext)).toThrow(
          'outside the valid range',
        );
      });
    });

    describe('when the number is 600 or greater', () => {
      it('throws a configuration error', () => {
        expect(() => validateCodes(600, mockMatchContext)).toThrow(
          CaseConfigurationError,
        );
        expect(() => validateCodes(600, mockMatchContext)).toThrow(
          'outside the valid range',
        );
      });
    });

    describe('when the number is negative', () => {
      it('throws a configuration error for being outside range', () => {
        expect(() => validateCodes(-200, mockMatchContext)).toThrow(
          CaseConfigurationError,
        );
        expect(() => validateCodes(-200, mockMatchContext)).toThrow(
          'outside the valid range',
        );
      });
    });
  });

  describe('when given a single string', () => {
    describe('when the string represents a valid status code', () => {
      it('parses and returns the number', () => {
        expect(validateCodes('200', mockMatchContext)).toBe(200);
        expect(validateCodes('404', mockMatchContext)).toBe(404);
        expect(validateCodes('500', mockMatchContext)).toBe(500);
      });
    });

    describe('when the string contains X or x as wildcards', () => {
      it('replaces them with 0 and validates', () => {
        expect(validateCodes('2xx', mockMatchContext)).toBe(200);
        expect(validateCodes('2XX', mockMatchContext)).toBe(200);
        expect(validateCodes('20x', mockMatchContext)).toBe(200);
        expect(validateCodes('4Xx', mockMatchContext)).toBe(400);
      });
    });

    describe('when the string parses to a decimal', () => {
      it('truncates to integer and validates', () => {
        expect(validateCodes('200.5', mockMatchContext)).toBe(200);
        expect(validateCodes('404.9', mockMatchContext)).toBe(404);
      });
    });

    describe('when the string parses to a number outside valid range', () => {
      it('throws a configuration error', () => {
        expect(() => validateCodes('99', mockMatchContext)).toThrow(
          CaseConfigurationError,
        );
        expect(() => validateCodes('600', mockMatchContext)).toThrow(
          CaseConfigurationError,
        );
        expect(() => validateCodes('9xx', mockMatchContext)).toThrow(
          CaseConfigurationError,
        );
      });
    });
  });

  describe('when given an array', () => {
    describe('when the array is empty', () => {
      it('throws a configuration error', () => {
        expect(() => validateCodes([], mockMatchContext)).toThrow(
          CaseConfigurationError,
        );
        expect(() => validateCodes([], mockMatchContext)).toThrow(
          "An empty array isn't a valid list",
        );
      });
    });

    describe('when the array contains valid codes', () => {
      it('validates all and returns the first', () => {
        expect(validateCodes([200, 201, 204], mockMatchContext)).toBe(200);
        expect(validateCodes(['200', '404', '500'], mockMatchContext)).toBe(
          200,
        );
        expect(validateCodes(['2xx', '404'], mockMatchContext)).toBe(200);
      });
    });

    describe('when the array contains an invalid code', () => {
      it('throws a configuration error', () => {
        expect(() => validateCodes([200, 99], mockMatchContext)).toThrow(
          CaseConfigurationError,
        );
        expect(() => validateCodes([600, 200], mockMatchContext)).toThrow(
          CaseConfigurationError,
        );
        expect(() => validateCodes(['200', '99'], mockMatchContext)).toThrow(
          CaseConfigurationError,
        );
      });
    });

    describe('when the array contains mixed valid numbers and strings', () => {
      it('validates all and returns the first', () => {
        expect(validateCodes([200, '404', '2xx'], mockMatchContext)).toBe(200);
        expect(validateCodes(['2xx', 404, 500], mockMatchContext)).toBe(200);
      });
    });
  });

  describe('when given an invalid type', () => {
    it('throws a configuration error', () => {
      expect(() => validateCodes({} as any, mockMatchContext)).toThrow(
        CaseConfigurationError,
      );
      expect(() => validateCodes({} as any, mockMatchContext)).toThrow(
        'is not a valid type',
      );
    });
  });
});
