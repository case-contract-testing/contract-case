import type { AnyInteractionType } from './nodes/interactions/types';
import type { MatchResult } from './results/types';
import type { SetupInfoFor } from './setup/types';

export * from './results/types';

export type Verifiable<T extends AnyInteractionType> = {
  mock: SetupInfoFor<T>;
  verify: () => Promise<MatchResult>;
};
