import { format } from 'pretty-format';

/**
 * Converts actual data into a string, for printing
 * @public
 * @param actual - the actual data that ContractCase encountered
 * @param indent - how many spaces to indent this string
 * @returns a printable string
 */
export const actualToString = <T>(actual: T, indent = 0): string =>
  format(actual, { indent });

/**
 * Converts a matcher or data into a human friendly string for printing
 * @public
 * @remarks
 * This is currently the same implementation as {@link actualToString}
 *
 * TODO: Add a better implementation that walks the tree and prints something
 * like the DSL does for easy readability
 *
 * @param actual - the matcher descriptor
 * @param indent - how many spaces to indent this string
 * @returns a printable string
 */
export const matcherToString = actualToString;
