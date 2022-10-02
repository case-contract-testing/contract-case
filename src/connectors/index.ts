import type { SetupFns } from 'core/types';
import { SEND_HTTP_REQUEST } from 'entities/nodes/interactions/types';
import { setupHttp } from './http';

export const SetupFunctions: SetupFns = {
  [SEND_HTTP_REQUEST]: setupHttp,
};
