import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';

export const isObject = (
  actual: unknown,
): actual is Record<string, AnyCaseMatcherOrData> => // the return type here is technically not correct
  typeof actual === 'object' &&
  actual === Object(actual) &&
  !Array.isArray(actual) &&
  actual != null;
