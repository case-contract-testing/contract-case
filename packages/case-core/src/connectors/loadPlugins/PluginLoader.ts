import {
  ContractCasePlugin,
  DataContext,
  IsCaseNodeForType,
  constructDataContext,
} from '@contract-case/case-plugin-base';
import { AnyMockDescriptor } from '@contract-case/case-plugin-dsl-types';
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
    MockD extends AnyMockDescriptor,
  >(
    plugins: Array<ContractCasePlugin<MatchT, MockT, MatchD, MockD, unknown>>,
  ): void {
    // TODO: Validate plugins here
    loadPlugins(this.context, plugins);
  }
}
