import type { AnyInteractionType } from './nodes/interactions/types';
import type { MatchResult } from './results/types';
import type { SetupInfoFor } from './nodes/interactions/setup.types';

export * from './results/types';
export * from './nodes/interactions/types';
export * from './nodes/matchers/types';
export * from './nodes/matchers/http/types';

export type Assertable<T extends AnyInteractionType> = {
  mock: SetupInfoFor<T>;
  assert: () => Promise<MatchResult>;
};
