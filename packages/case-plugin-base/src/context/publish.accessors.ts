import { MatchContext } from './types';

/**
 * True if this context can never publish results. This is useful for
 * determining whether warning logs should be printed if the verification won't
 * have any effect
 *
 * @param context - MatchContext
 * @returns True if this context can never publish results; false if it might publish
 */
export const cantPublish = (context: MatchContext): boolean =>
  context['_case:currentRun:context:publish'] === false ||
  context['_case:currentRun:context:publish'] === 'NEVER';
