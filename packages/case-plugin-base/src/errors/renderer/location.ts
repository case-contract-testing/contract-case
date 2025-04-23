import { locationString } from '../../context/locationString';
import { LogLevelContext } from '../../context/types';

/**
 * Constructs a string for reporting where an error happened
 *
 * @internal
 * @param matchContext - the context for logging
 * @returns
 */
export const errorLocationString = (matchContext: LogLevelContext): string =>
  ` (at ${locationString(matchContext)})`;
