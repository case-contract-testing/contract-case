import type { AnyInteractionType } from 'entities/nodes/interactions/types';
import type { LogLevel } from 'entities/logger/types';
import type { InteractionSetupFn } from 'entities/nodes/interactions/setup.types';
import type { HttpResponseProviderConfig } from './connectors/types';

export type SetupFns = { [T in AnyInteractionType]: InteractionSetupFn<T> };

export type CaseConfig = Partial<HttpResponseProviderConfig> & {
  logLevel?: LogLevel;
};
