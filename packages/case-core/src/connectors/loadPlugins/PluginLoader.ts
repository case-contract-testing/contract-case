import {
  CaseConfigurationError,
  ContractCasePlugin,
  DataContext,
  IsCaseNodeForType,
  IsMockDescriptorForType,
  constructDataContext,
  isContractCasePlugin,
} from '@contract-case/case-plugin-base';
import type { CaseConfig } from '../../core/types';

import { configFromEnv, configToRunContext } from '../../core/config';
import { writerDependencies } from '../dependencies';
import { TestPrinter } from '../contract/types';
import { loadPlugins } from '../../core/plugins';

export class PluginLoader {
  context: DataContext;

  constructor(
    config: CaseConfig,
    printer: TestPrinter,
    parentVersions: Array<string>,
    dependencies = writerDependencies(printer),
  ) {
    this.context = constructDataContext(
      dependencies.makeLogger,
      dependencies.resultFormatter,
      {
        ...configToRunContext({
          ...dependencies.defaultConfig,
          ...configFromEnv(),
          ...config,
        }),
      },
      dependencies.defaultConfig,
      parentVersions,
    );
  }

  loadPlugins<
    MatchT extends string,
    MockT extends string,
    MatchD extends IsCaseNodeForType<MatchT>,
    MockD extends IsMockDescriptorForType<MockT>,
  >(
    plugins: Array<ContractCasePlugin<MatchT, MockT, MatchD, MockD, unknown>>,
  ): void {
    plugins.forEach((plugin) => {
      if (!isContractCasePlugin(plugin)) {
        throw new CaseConfigurationError(
          `Unable to load plugins, as one of the objects provided wasn't a ContractCase plugin. Plugins must be objects with 'description', 'matcherExecutors' and 'setupMocks' properties. If you are loading a plugin module by name, this is an error in the plugin's packaging - please contact the plugin's authors.`,
          'DONT_ADD_LOCATION',
          'INVALID_PLUGIN_MODULE',
        );
      }
    });
    loadPlugins(this.context, plugins);
  }
}
