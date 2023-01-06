import { actualToString } from 'entities/results';
import type { AnyCaseNodeOrData } from 'entities/types';

export const isObject = (
  actual: unknown
): actual is Record<string, AnyCaseNodeOrData> => // the return type here is technically not correct
  typeof actual === 'object' &&
  actual === Object(actual) &&
  !Array.isArray(actual) &&
  actual != null;

export const whyNotAnObject = (actual: unknown): string => {
  if (typeof actual !== 'object') {
    return `Expected an object, but the type was '${typeof actual}' instead`;
  }
  if (Array.isArray(actual)) {
    return 'Expected an object, but it was an array';
  }
  if (actual != null) {
    return 'Expected an object, but it was null or undefined';
  }
  if (actual !== Object(actual)) {
    return `Expected an object, but '${actualToString(
      actual
    )}' is not an object because the Object constructor doesn't return a reference to it`;
  }

  return `If you are seeing this message, there is a bug in whyNotAnObject, where it can't see a reason that '${actualToString(
    actual
  )} is not an Object.`;
};
