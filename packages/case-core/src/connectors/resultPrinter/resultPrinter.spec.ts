/* eslint-disable jest/expect-expect */
import {
  matchingError,
  VerifyTriggerReturnObjectError,
} from '@contract-case/case-plugin-base';
import {
  EMPTY_DATA_CONTEXT,
  EMPTY_MATCH_CONTEXT,
} from '../../__tests__/testContext';
import { anyString } from '../../boundaries';
import { defaultPrinter } from '../../__tests__/jest/defaultTestPrinter';
import {
  configurationError,
  failedExpectationError,
  triggerError,
  verificationError,
} from '../../entities/results';
import { AnyState } from '../../entities/types';
import { makeResultFormatter } from './resultFormatter';

const MOCK_EXAMPLE = {
  result: 'VERIFIED',
  states: [] as AnyState[],
  mock: {
    request: {
      '_case:matcher:type': '_case:Lookup',
      '_case:matcher:uniqueName': 'an example printout request',
      '_case:matcher:child': {
        method: 'GET',
        path: {
          '_case:matcher:type': '_case:StringPrefix',
          '_case:matcher:prefix': '/users/',
          '_case:matcher:suffix': '123',
          '_case:matcher:resolvesTo': 'string',
        },
        '_case:matcher:type': '_case:HttpRequestMatcher',
      },
    },
    response: {
      '_case:matcher:type': '_case:Lookup',
      '_case:matcher:uniqueName': 'an example printout response',
      '_case:matcher:child': {
        status: 404,
        '_case:matcher:type': '_case:HttpResponseMatcher',
      },
    },
    '_case:mock:type': '_case:MockHttpServer',
    '_case:run:context:setup': {
      write: {
        type: '_case:MockHttpServer',
        stateVariables: 'default',
        triggers: 'provided',
      },
      read: {
        type: '_case:MockHttpClient',
        stateVariables: 'state',
        triggers: 'generated',
      },
    },
  },
} as const;

const resultPrinter = makeResultFormatter(defaultPrinter);

describe('result printer', () => {
  it('prints success', () => {
    resultPrinter.printSuccessTitle(MOCK_EXAMPLE, '1', EMPTY_DATA_CONTEXT);
  });

  it('prints failure', () => {
    resultPrinter.printFailureTitle(MOCK_EXAMPLE, '1', EMPTY_DATA_CONTEXT);
  });

  it('prints downloaded contract', () => {
    resultPrinter.printDownloadedContract(
      'testing-the-printing-of-this-message-filename.json',
      EMPTY_DATA_CONTEXT,
    );
  });

  describe('with a matching error', () => {
    it('prints error details', () => {
      resultPrinter.printError(
        matchingError(
          anyString('foo'),
          'Example error message details',
          "really, this isn't an error",
          EMPTY_MATCH_CONTEXT,
          'this was expected to happen',
        ),
        EMPTY_DATA_CONTEXT,
      );
    });
  });

  describe('with a raw matching error', () => {
    it('prints error details', () => {
      resultPrinter.printError(
        failedExpectationError(
          "really, this isn't an error",
          'Example error message details',
          'SomeExampleFailure',
          EMPTY_MATCH_CONTEXT,
          'this was expected to happen',
        ),
        EMPTY_DATA_CONTEXT,
      );
    });
  });
  describe('with a trigger error', () => {
    it('prints error details', () => {
      resultPrinter.printError(
        triggerError(
          new Error('This error is expected to happen'),
          EMPTY_MATCH_CONTEXT,
        ),
        EMPTY_DATA_CONTEXT,
      );
    });
  });

  describe('with a configuration error', () => {
    it('prints error details', () => {
      resultPrinter.printError(
        configurationError(
          new Error('This error is also expected to happen'),
          EMPTY_MATCH_CONTEXT,
        ),
        EMPTY_DATA_CONTEXT,
      );
    });
  });

  describe('with a verification error', () => {
    it('prints error details', () => {
      resultPrinter.printError(
        verificationError(
          new VerifyTriggerReturnObjectError(
            new Error('This error, too, is expected to happen'),
          ),
          EMPTY_MATCH_CONTEXT,
        ),
        EMPTY_DATA_CONTEXT,
      );
    });
  });
});
