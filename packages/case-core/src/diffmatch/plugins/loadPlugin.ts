import {
  AnyMockDescriptor,
  CaseConfigurationError,
  CaseCoreError,
  ContractCasePlugin,
  IsCaseNodeForType,
  LogContext,
  MockExecutorFn,
  CORE_PLUGIN_PREFIX,
} from '@contract-case/case-plugin-base';

import { caseVersion } from '../../entities/caseVersion';
import { MockSetupFns } from './types';

const typeToPluginName: Record<string, string> = {};

const loadedPluginVersions: Record<string, string> = {};

export const loadPlugin = <
  MatchT extends string,
  MockT extends string,
  MatchD extends IsCaseNodeForType<MatchT>,
  MockD extends AnyMockDescriptor,
>(
  MockExecutors: MockSetupFns,
  context: LogContext,
  plugin: ContractCasePlugin<MatchT, MockT, MatchD, MockD, unknown>,
): void => {
  if (loadedPluginVersions[plugin.name] != null) {
    if (plugin.version !== loadedPluginVersions[plugin.name]) {
      if (
        plugin.name.startsWith(CORE_PLUGIN_PREFIX) &&
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
      `Plugin '${plugin.name}' at version '${plugin.version}' has been previously loaded, skipping`,
    );
    return;
  }
  if (plugin.name.startsWith(CORE_PLUGIN_PREFIX)) {
    context.logger.deepMaintainerDebug(`Loading core plugin '${plugin.name}'`);
  } else {
    context.logger.debug(
      `Loading plugin '${plugin.name}' version ${plugin.version}`,
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
    // Additionally, we disable param-reassign, because here we intend to do it
    // eslint-disable-next-line no-param-reassign
    MockExecutors[mockType as '_case:MockHttpServer'] = setup as MockExecutorFn<
      AnyMockDescriptor,
      unknown,
      '_case:MockHttpServer'
    >;
    typeToPluginName[mockType] = plugin.name;
  });

  loadedPluginVersions[plugin.name] = plugin.version;
};
