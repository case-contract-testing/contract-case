import { format } from 'pretty-format';

export const actualToString = <T>(actual: T): string => format(actual);
