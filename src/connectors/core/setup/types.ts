import type { AnyInteractionType } from 'entities/nodes/interactions/types';
import type { InteractionSetupFn } from 'entities/nodes/interactions/setup.types';

export type SetupFns = { [T in AnyInteractionType]: InteractionSetupFn<T> };
