import { MOCK_HTTP_CLIENT, MOCK_HTTP_SERVER } from 'entities/types';

import type { MockSetupFns } from './mockExecutor/types';
import { setupHttpResponseProducer } from './connectors/mockHttpServer';
import { setupHttpResponseConsumer } from './connectors/mockHttpClient';

export const MockExecutors: MockSetupFns = {
  [MOCK_HTTP_CLIENT]: setupHttpResponseConsumer,
  [MOCK_HTTP_SERVER]: setupHttpResponseProducer,
};
