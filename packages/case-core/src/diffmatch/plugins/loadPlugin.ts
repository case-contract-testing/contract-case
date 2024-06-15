import {
  AnyMockDescriptor,
  CaseConfigurationError,
  CaseCoreError,
  ContractCasePlugin,
  IsCaseNodeForType,
  LogContext,
  MockExecutorFn,
  CORE_PLUGIN_PREFIX,
  MatcherExecutor,
} from '@contract-case/case-plugin-base';

import { CoreNumberMatcher } from '@contract-case/case-entities-internal';
import { caseVersion } from '../../entities/caseVersion';
import { MockSetupFns } from './types';
import { MatcherExecutors } from '../matching/MatcherExecutors';

const typeToPluginName: Record<string, string> = {};

const loadedPluginVersions: Record<string, string> = {};

const isCorePlugin = <
  MatchT extends string,
  MockT extends string,
  MatchD extends IsCaseNodeForType<MatchT>,
  MockD extends AnyMockDescriptor,
>(
  plugin: ContractCasePlugin<MatchT, MockT, MatchD, MockD, unknown>,
): boolean => plugin.name.startsWith(CORE_PLUGIN_PREFIX);

const isCoreType = (type: string): boolean => type.startsWith('_case:');

const IN_PROGRESS = 'LOAD_IN_PROGRESS';

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
  if (plugin.version === IN_PROGRESS) {
    throw new CaseConfigurationError(
      `The plugin '${plugin.name}' reported its version to be LOAD_IN_PROGRESS, which is not valid. Contact the plugin authors to fix this.`,
    );
  }

  if (loadedPluginVersions[plugin.name] != null) {
    if (plugin.version !== loadedPluginVersions[plugin.name]) {
      throw new CaseConfigurationError(
        `Trying to load plugin '${plugin.name}' at version '${plugin.version}', but it was previously loaded as version '${loadedPluginVersions[plugin.name]}'.`,
      );
    }
    context.logger.deepMaintainerDebug(
      `Plugin '${plugin.name}' at version '${plugin.version}' has been previously loaded, skipping`,
    );
    return;
  }
  // We record this at the start, as otherwise failed plugins cause errors every time
  loadedPluginVersions[plugin.name] = plugin.version;

  if (isCorePlugin(plugin)) {
    if (plugin.version !== caseVersion) {
      throw new CaseCoreError(
        `Core plugin '${plugin.name}' is at version '${plugin.version}', but this is Core version ${caseVersion}. This isn't supposed to happen.`,
      );
    }

    context.logger.deepMaintainerDebug(`Loading core plugin '${plugin.name}'`);
  } else {
    context.logger.debug(
      `Loading plugin '${plugin.name}' version ${plugin.version}`,
    );
  }

  Object.entries(plugin.setupMocks).forEach(([mockType, setup]) => {
    if (mockType in MockExecutors) {
      throw new CaseConfigurationError(
        `Plugin '${plugin.name}' @ ${plugin.version} attempted to load a mock setup function for '${mockType}', but one had already been loaded by plugin '${typeToPluginName[mockType]}'.`,
      );
    }
    if (isCorePlugin(plugin)) {
      if (!isCoreType(mockType)) {
        throw new CaseCoreError(
          `Core plugin '${plugin.name}' @ ${plugin.version}' tried to load a non-core mock, '${mockType}'`,
        );
      }
      context.logger.deepMaintainerDebug(
        `Core plugin '${plugin.name}' @ ${plugin.version}' registered a mock setup function with type '${mockType}'`,
      );
    } else {
      if (isCoreType(mockType)) {
        throw new CaseConfigurationError(
          `Non-core plugin '${plugin.name} @ ${plugin.version}' tried to load a core mock, '${mockType}'. This is an error in the plugin definition, please contact the plugin's authors`,
        );
      }
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

  Object.entries(plugin.matcherExecutors).forEach(
    ([pluginExecutorType, pluginExecutor]) => {
      if (pluginExecutorType in MatcherExecutors) {
        throw new CaseConfigurationError(
          `Plugin '${plugin.name} @ ${plugin.version}' attempted to load a matcher executor for '${pluginExecutorType}', but one had already been loaded by plugin '${typeToPluginName[pluginExecutorType]}'.`,
        );
      }
      if (pluginExecutorType.startsWith(`_case:`)) {
        context.logger.deepMaintainerDebug(
          `Core plugin '${plugin.name} @ ${plugin.version}' registered a matcher executor with type '${pluginExecutorType}'`,
        );
      } else {
        context.logger.debug(
          `Plugin '${plugin.name} @ ${plugin.version}' registered a matcher executor with type '${pluginExecutorType}'`,
        );
      }

      // We cheat the type system here - we can't actually
      // do any type checking so we just tell typescript it's any known type.
      MatcherExecutors[pluginExecutorType as '_case:MatchNumber'] =
        pluginExecutor as MatcherExecutor<
          '_case:MatchNumber',
          CoreNumberMatcher
        >;
    },
  );
  loadedPluginVersions[plugin.name] = plugin.version;
};
