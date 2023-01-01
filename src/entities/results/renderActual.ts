import { format } from 'pretty-format';

export const actualToString = <T>(actual: T, indent = 0): string =>
  format(actual, { indent });
