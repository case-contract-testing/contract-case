import { locationString } from 'entities/context';
import type { MatchContext } from 'entities/context/types';
import type { VerifyTriggerReturnObjectError } from 'entities/errors';
import type { AnyCaseMatcher } from 'entities/nodes/matchers/types';
import {
  ERROR_TYPE_MATCHING,
  CaseError,
  ExecutionError,
  ERROR_TYPE_EXECUTION,
  ERROR_TYPE_VERIFICATION,
  VerificationError,
} from './types';

export const errorWhen = (
  test: boolean,
  err: CaseError | Array<CaseError>
): Array<CaseError> => (test ? [err].flat() : []);

/**
 *
 * @param matcher The matcher that generated this error
 * @param message
 * @param actual
 * @returns
 */
export const matchingError = (
  matcher: AnyCaseMatcher,
  message: string,
  actual: unknown,
  context: MatchContext,
  expected?: unknown
): CaseError => ({
  type: ERROR_TYPE_MATCHING,
  matcher,
  message,
  expected:
    expected ||
    ('case:matcher:example' in matcher
      ? matcher['case:matcher:example']
      : context.descendAndStrip(matcher, context)),
  actual,
  location: context['case:currentRun:context:location'],
  toString: () =>
    `${locationString(context)}: ${message} (${matcher['case:matcher:type']})`,
});

export const executionError = (
  error: Error,
  context: MatchContext
): ExecutionError => ({
  type: ERROR_TYPE_EXECUTION,
  message: error.message,
  code: error.name,
  location: context['case:currentRun:context:location'],
});

export const verificationError = (
  error: VerifyTriggerReturnObjectError,
  context: MatchContext
): VerificationError => ({
  type: ERROR_TYPE_VERIFICATION,
  message: error.message,
  code: error.name,
  error,
  location: context['case:currentRun:context:location'],
});
