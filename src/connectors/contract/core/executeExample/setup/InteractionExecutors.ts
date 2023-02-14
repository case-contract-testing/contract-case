import { MOCK_HTTP_CLIENT, MOCK_HTTP_SERVER } from 'entities/types';

import type { InteractionSetupFns } from './interactionExecutor/types';
import { setupHttpResponseProducer } from './connectors/produceHttpResponse';
import { setupHttpResponseConsumer } from './connectors/consumeHttpResponse';

export const InteractionExecutors: InteractionSetupFns = {
  [MOCK_HTTP_CLIENT]: setupHttpResponseConsumer,
  [MOCK_HTTP_SERVER]: setupHttpResponseProducer,
};
