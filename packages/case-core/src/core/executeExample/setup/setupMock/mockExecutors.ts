import {
  MOCK_HTTP_CLIENT,
  MOCK_HTTP_SERVER,
} from '@contract-case/case-core-plugin-http-dsl';
import {
  setupHttpResponseConsumer,
  setupHttpResponseProducer,
} from '@contract-case/case-core-plugin-http';
import type { MockSetupFns } from './mockExecutor/types';

export const MockExecutors: MockSetupFns = {
  [MOCK_HTTP_CLIENT]: setupHttpResponseConsumer,
  [MOCK_HTTP_SERVER]: setupHttpResponseProducer,
};
