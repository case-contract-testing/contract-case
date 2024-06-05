import { format } from 'pretty-format';

export const actualToString = <T>(actual: T, indent = 0): string =>
  format(actual, { indent });

// TODO: A better implementation of this
export const matcherToString = actualToString;
