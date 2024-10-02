import { actualToString } from '@contract-case/case-plugin-base';
import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';

export const isObject = (
  actual: unknown,
): actual is Record<string, AnyCaseMatcherOrData> => // the return type here is technically not correct
  typeof actual === 'object' &&
  actual === Object(actual) &&
  !Array.isArray(actual) &&
  actual != null;

export const whyNotAnObject = (actual: unknown): string => {
  if (actual == null) {
    return 'Expected an object, but it was null or undefined';
  }
  if (typeof actual !== 'object') {
    return `Expected an object, but the type was '${typeof actual}' instead`;
  }
  if (Array.isArray(actual)) {
    return 'Expected an object, but it was an array';
  }

  return `If you are seeing this message, there is a bug in whyNotAnObject, where it can't see a reason that '${actualToString(
    actual,
  )}' is not an Object, or it is inappropriately called.`;
};
