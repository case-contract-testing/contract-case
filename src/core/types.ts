import type { SetupInfoFor } from './setup/types';
import type { AnyInteractionType } from './nodes/interactions/types';

export interface MatchingError {
  message: string;
  expected: unknown;
  actual: unknown;
  toString: () => string;
}

export type MatchResult = Array<MatchingError>;

export type Verifiable<T extends AnyInteractionType> = {
  mock: SetupInfoFor<T>;
  verify: () => Promise<MatchResult>;
};
