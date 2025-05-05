import { locationString } from '../../context/locationString';
import { LogLevelContext } from '../../context/types';

/**
 * Constructs a string for reporting where an error happened
 *
 * @internal
 * @param matchContext - the context for logging
 * @returns
 */
export const errorLocationString = (matchContext: LogLevelContext): string => {
  if (
    matchContext['_case:currentRun:context:location'].length === 0 ||
    (matchContext['_case:currentRun:context:location'].length === 1 &&
      matchContext['_case:currentRun:context:location'][0] === '')
  ) {
    // Hack to prevent empty locations
    return '';
  }
  return ` (at ${locationString(matchContext)})`;
};
