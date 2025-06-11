import { MatchContext } from './types';

/**
 * True if this context can never publish results
 *
 * @param context - MatchContext
 * @returns True if this context can never publish results; false if it might publish
 */
export const cantPublish = (context: MatchContext): boolean =>
  context['_case:currentRun:context:publish'] === false ||
  context['_case:currentRun:context:publish'] === 'NEVER';
