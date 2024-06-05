import {
  AnyCaseMatcherOrData,
  CaseConfigurationError,
} from '@contract-case/case-plugin-base';

export const rawEquality = (
  a: AnyCaseMatcherOrData | undefined,
  b: AnyCaseMatcherOrData | undefined,
): boolean => {
  if (a === null && b === null) return true;
  if (
    typeof a === 'function' ||
    typeof a === 'bigint' ||
    typeof a === 'symbol'
  ) {
    throw new CaseConfigurationError(
      `It looks like an object of type '${typeof a}' was attempted to be serialised in the contract. This is unsupported`,
    );
  }
  if (
    typeof b === 'function' ||
    typeof b === 'bigint' ||
    typeof b === 'symbol'
  ) {
    throw new CaseConfigurationError(
      `It looks like an object of type '${typeof b}' was attempted to be serialised in the contract. This is unsupported`,
    );
  }
  if (typeof a !== typeof b) return false;
  if (typeof a === 'string') return a === b;
  if (typeof a === 'number')
    return a === b || (Number.isNaN(a) && Number.isNaN(b));
  if (typeof a === 'boolean') return a === b;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a
      .map((item, index) => rawEquality(item, b[index]))
      .reduce((acc, curr) => acc && curr, true);
  }

  if (
    typeof a === 'object' &&
    a === Object(a) &&
    !Array.isArray(a) &&
    a != null &&
    typeof b === 'object' &&
    b === Object(b) &&
    !Array.isArray(b) &&
    b != null
  ) {
    const aEntries = Object.entries(a);
    const bEntries = Object.entries(b);
    if (aEntries.length !== bEntries.length) return false;
    return aEntries
      .map(([key, value]) =>
        rawEquality(value, (b as Record<string, AnyCaseMatcherOrData>)[key]),
      )
      .reduce((acc, curr) => acc && curr, true);
  }
  return false;
};
