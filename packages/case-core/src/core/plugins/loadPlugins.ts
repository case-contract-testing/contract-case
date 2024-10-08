import CoreHttpPlugin from '@contract-case/case-core-plugin-http';
import CoreFunctionPlugin from '@contract-case/case-core-plugin-function';
import {
  ContractCasePlugin,
  DataContext,
  IsCaseNodeForType,
  MatchContext,
} from '@contract-case/case-plugin-base';
import { AnyMockDescriptor } from '@contract-case/case-plugin-dsl-types';

import { loadPlugin } from '../../diffmatch';
import { MockExecutors } from './mockExecutors';

const DEFAULT_CORE_PLUGINS = [CoreHttpPlugin, CoreFunctionPlugin];

// TODO: type the plugins nicer so this isn't necessary
type TrustMeBro = typeof CoreHttpPlugin;

export const loadPlugins = <
  MatchT extends string,
  MockT extends string,
  MatchD extends IsCaseNodeForType<MatchT>,
  MockD extends AnyMockDescriptor,
>(
  context: DataContext,
  plugins: Array<ContractCasePlugin<MatchT, MockT, MatchD, MockD, unknown>>,
): void => {
  plugins.forEach((plugin) => loadPlugin(MockExecutors, context, plugin));
};

export const loadCorePlugins = (context: MatchContext): void => {
  loadPlugins(context, DEFAULT_CORE_PLUGINS as TrustMeBro[]);
};
