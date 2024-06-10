import {
  AnyMockDescriptor,
  CaseConfigurationError,
  CaseCoreError,
  ContractCasePlugin,
  IsCaseNodeForType,
  LogContext,
  MockExecutorFn,
} from '@contract-case/case-plugin-base';

import type { MockSetupFns } from './mockExecutor/types';
import { caseVersion } from '../../../../entities/caseVersion';

export const MockExecutors: MockSetupFns = {} as MockSetupFns;

const typeToPluginName: Record<string, string> = {};

const loadedPluginVersions: Record<string, string> = {};

export const loadPlugin = <
  MatchT extends string,
  MockT extends string,
  MatchD extends IsCaseNodeForType<MatchT>,
  MockD extends AnyMockDescriptor,
>(
  context: LogContext,
  plugin: ContractCasePlugin<MatchT, MockT, MatchD, MockD, unknown>,
): void => {
  if (loadedPluginVersions[plugin.name] != null) {
    if (plugin.version !== loadedPluginVersions[plugin.name]) {
      if (
        plugin.name.startsWith(`_CaseCore:`) &&
        plugin.version !== caseVersion
      ) {
        throw new CaseCoreError(
          `Core plugin '${plugin.name}' is at version '${plugin.version}', but this is Core version ${caseVersion}. This isn't supposed to happen.`,
        );
      }
      throw new CaseConfigurationError(
        `Trying to load plugin '${plugin.name}' at version '${plugin.version}', but it was previously loaded as version '${loadedPluginVersions[plugin.name]}'.`,
      );
    }
    context.logger.deepMaintainerDebug(
      `Plugin '${plugin.name}' at version '${plugin.version}' has been previously loaded, skipping load of mock executors`,
    );
    return;
  }
  if (plugin.name.startsWith(`_CaseCore:`)) {
    context.logger.deepMaintainerDebug(`Loading core plugin '${plugin.name}'`);
  } else {
    context.logger.debug(
      `Loading mock definitions for plugin '${plugin.name}' version ${plugin.version}`,
    );
  }

  Object.entries(plugin.setupMocks).forEach(([mockType, setup]) => {
    if (mockType in MockExecutors) {
      throw new CaseConfigurationError(
        `Plugin '${plugin.name} @ ${plugin.version}' attempted to load a mock setup function for '${mockType}', but one had already been loaded by plugin '${typeToPluginName[mockType]}'.`,
      );
    }
    if (mockType.startsWith(`_case:`)) {
      context.logger.deepMaintainerDebug(
        `Core plugin '${plugin.name} @ ${plugin.version}' registered a mock setup function with type '${mockType}'`,
      );
    } else {
      context.logger.debug(
        `Plugin '${plugin.name} @ ${plugin.version}' registered a mock setup function with type '${mockType}'`,
      );
    }

    // We cheat the type system here - we can't actually
    // do any type checking so we just tell typescript it's any known type.
    MockExecutors[mockType as '_case:MockHttpServer'] = setup as MockExecutorFn<
      AnyMockDescriptor,
      unknown,
      '_case:MockHttpServer'
    >;

    typeToPluginName[mockType] = plugin.name;
    loadedPluginVersions[plugin.name] = plugin.version;
  });
};
