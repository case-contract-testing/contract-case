import type { InteractionSetupFn } from 'entities/nodes/interactions/setup.types';
import type { AnyInteractionType } from 'entities/types';

export type InteractionSetupFns = {
  [T in AnyInteractionType]: InteractionSetupFn<T>;
};
