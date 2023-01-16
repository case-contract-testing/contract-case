import type { AnyInteractionType } from './nodes/interactions/types';
import type { MatchResult } from './results/types';
import type { SetupInfoFor } from './nodes/interactions/setup.types';
import type { AnyCaseNodeOrData } from './nodes/types';

export * from './results/types';
export * from './nodes/types';
export * from './context/types';
export * from './contract/types';
export * from './logger/types';

export type Assertable<T extends AnyInteractionType> = {
  mock: SetupInfoFor<T>;
  assert: () => Promise<MatchResult>;
  stripMatchers: (something: AnyCaseNodeOrData) => unknown;
};
