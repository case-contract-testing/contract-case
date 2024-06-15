import CoreHttpPlugin from '@contract-case/case-core-plugin-http';
import {
  AllHttpMatcherTypes,
  MOCK_HTTP_CLIENT,
  MOCK_HTTP_SERVER,
  AllHttpMatcherDescriptors,
  AllHttpMockDescriptors,
} from '@contract-case/case-core-plugin-http-dsl';
import { MatchContext } from '@contract-case/case-plugin-base';

import { MockExecutors } from '../mockExecutors';
import { loadPlugin } from '../../../../../diffmatch';

const DEFAULT_PLUGINS = [CoreHttpPlugin] as const;

export const loadPlugins = (context: MatchContext): void => {
  DEFAULT_PLUGINS.forEach((plugin) =>
    loadPlugin<
      AllHttpMatcherTypes,
      typeof MOCK_HTTP_CLIENT | typeof MOCK_HTTP_SERVER,
      AllHttpMatcherDescriptors,
      AllHttpMockDescriptors
    >(MockExecutors, context, plugin),
  );
};
