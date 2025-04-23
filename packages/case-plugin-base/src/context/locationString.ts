import { LogLevelContext } from './types';

/**
 * Helper to determine if maintainer debug logging is on. This exists to avoid a
 * dependency cycle from `shouldLog`
 *
 * @internal
 * @param matchContext - LogLevelContext
 * @returns true if maintainer debug logging is on
 */
const isMaintainerDebug = (matchContext: LogLevelContext) =>
  matchContext['_case:currentRun:context:logLevel'] === 'maintainerDebug' ||
  matchContext['_case:currentRun:context:logLevel'] === 'deepMaintainerDebug';

/**
 * Gets the string representation of the current context
 *
 * @internal
 */
export const locationString = (matchContext: LogLevelContext): string =>
  matchContext['_case:currentRun:context:location']
    .filter(
      (locationItem) =>
        (locationItem.startsWith(':') && isMaintainerDebug(matchContext)) ||
        !locationItem.startsWith(':'),
    )
    .reduce<string>(
      (acc: string, curr: string) =>
        curr.startsWith('[') || curr.startsWith(':') || acc === ''
          ? `${acc}${curr}`
          : `${acc}.${curr}`,
      '',
    );
