import CoreHttpPlugin from '@contract-case/case-core-plugin-http';
import CoreFunctionPlugin from '@contract-case/case-core-plugin-function';
import {
  ContractCasePlugin,
  DataContext,
  IsCaseNodeForType,
  IsMockDescriptorForType,
  MatchContext,
} from '@contract-case/case-plugin-base';

import { loadPlugin } from '../../diffmatch';
import { MockExecutors } from './mockExecutors';

const DEFAULT_CORE_PLUGINS = [CoreHttpPlugin, CoreFunctionPlugin];

// TODO: type the plugins nicer so this isn't necessary
type TrustMeBro = typeof CoreHttpPlugin;

export const loadPlugins = <
  MatchT extends string,
  MockT extends string,
  MatchD extends IsCaseNodeForType<MatchT>,
  MockD extends IsMockDescriptorForType<MockT>,
>(
  context: DataContext,
  plugins: Array<ContractCasePlugin<MatchT, MockT, MatchD, MockD, unknown>>,
): void => {
  plugins.forEach((plugin) => loadPlugin(MockExecutors, context, plugin));
};

export const loadCorePlugins = (context: MatchContext): void => {
  loadPlugins(context, DEFAULT_CORE_PLUGINS as TrustMeBro[]);
};
