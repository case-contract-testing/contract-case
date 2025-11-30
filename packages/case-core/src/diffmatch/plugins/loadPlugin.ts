import {
  CaseConfigurationError,
  CaseCoreError,
  ContractCasePlugin,
  IsCaseNodeForType,
  LogContext,
  CORE_PLUGIN_PREFIX,
  MatcherExecutor,
  IsMockDescriptorForType,
  MockExecutor,
} from '@contract-case/case-plugin-base';

import { CoreNumberMatcher } from '@contract-case/case-entities-internal';
import {
  AnyMockDescriptor,
  CaseMockDescriptorFor,
} from '@contract-case/case-plugin-dsl-types';
import { caseVersion } from '../../entities/versionString';
import { AllMockExecutors } from './types';
import { MatcherExecutors } from '../matching/MatcherExecutors';

const mockTypeToPluginHumanName: Record<string, string> = {};

const loadedPluginVersions: Record<string, string> = {};

const isCorePlugin = <
  MatchT extends string,
  MockT extends string,
  MatchD extends IsCaseNodeForType<MatchT>,
  MockD extends IsMockDescriptorForType<MockT>,
>(
  plugin: ContractCasePlugin<MatchT, MockT, MatchD, MockD, unknown>,
): boolean =>
  plugin.description.uniqueMachineName.startsWith(CORE_PLUGIN_PREFIX);

const isCoreType = (type: string): boolean => type.startsWith('_case:');

const IN_PROGRESS = 'LOAD_IN_PROGRESS';

/**
 * Loads a plugin into the cor
 *
 * Warning: This function mutates the value of MockExecutors
 *
 * @param MockExecutors - The mock executors to load into
 * @param context - The logging context
 * @param plugin - The plugin to load
 * @returns
 */
export const loadPlugin = <
  MatchT extends string,
  MockT extends string,
  MatchD extends IsCaseNodeForType<MatchT>,
  MockD extends IsMockDescriptorForType<MockT>,
>(
  MockExecutors: AllMockExecutors,
  context: LogContext,
  plugin: ContractCasePlugin<MatchT, MockT, MatchD, MockD, unknown>,
): void => {
  const { description } = plugin;
  if (description.version === IN_PROGRESS) {
    throw new CaseConfigurationError(
      `The plugin '${description.humanReadableName}' reported its version to be LOAD_IN_PROGRESS, which is not valid. Contact the plugin authors to fix this.`,
      'DONT_ADD_LOCATION',
      'UNDOCUMENTED',
    );
  }

  if (loadedPluginVersions[description.uniqueMachineName] != null) {
    if (
      plugin.description.version !==
      loadedPluginVersions[description.uniqueMachineName]
    ) {
      throw new CaseConfigurationError(
        `Trying to load plugin '${description.humanReadableName}' at version '${description.version}', but it was previously loaded as version '${loadedPluginVersions[description.uniqueMachineName]}'.`,
        'DONT_ADD_LOCATION',
        'UNDOCUMENTED',
      );
    }
    context.logger.deepMaintainerDebug(
      `Plugin '${description.humanReadableName}' at version '${description.version}' has been previously loaded, skipping`,
    );
    return;
  }
  // We record this at the start, as otherwise failed plugins cause errors every time
  loadedPluginVersions[description.uniqueMachineName] =
    plugin.description.version;

  if (isCorePlugin(plugin)) {
    if (plugin.description.version !== caseVersion) {
      throw new CaseCoreError(
        `Core plugin '${description.humanReadableName}' is at version 
        '${description.version}', but this is Core version ${caseVersion}. 
        These versions are supposed to match, and the ContractCase build process is supposed to prevent this happening.`,
      );
    }

    context.logger.deepMaintainerDebug(
      `Loading core plugin '${description.humanReadableName}'`,
      description,
    );
  } else {
    context.logger.debug(
      `Loading plugin '${description.humanReadableName}' version ${description.version}`,
    );
  }

  Object.entries(plugin.setupMocks).forEach(([mockType, setup]) => {
    if (mockType in MockExecutors) {
      throw new CaseConfigurationError(
        `Plugin '${description.humanReadableName}' @ ${plugin.description.version} 
        attempted to load a mock setup function for '${mockType}', 
        but one had already been loaded by plugin '${mockTypeToPluginHumanName[mockType]}'.`,
        'DONT_ADD_LOCATION',
        'UNDOCUMENTED',
      );
    }
    if (isCorePlugin(plugin)) {
      if (!isCoreType(mockType)) {
        throw new CaseCoreError(
          `Core plugin '${description.humanReadableName}' @ ${plugin.description.version}' tried to load a non-core mock, '${mockType}'`,
        );
      }
      context.logger.deepMaintainerDebug(
        `Core plugin '${description.humanReadableName}' @ ${plugin.description.version}' registered a mock setup function with type '${mockType}'`,
      );
    } else {
      if (isCoreType(mockType)) {
        throw new CaseConfigurationError(
          `Non-core plugin '${description.humanReadableName}' @ ${plugin.description.version} tried to load a core mock, '${mockType}'. This is an error in the plugin definition, please contact the plugin's authors`,
          'DONT_ADD_LOCATION',
          'UNDOCUMENTED',
        );
      }
      context.logger.debug(
        `Plugin '${description.humanReadableName}' @ ${plugin.description.version} registered a mock setup function with type '${mockType}'`,
      );
    }

    // We cheat the type system here - we can't actually
    // do any type checking so we just tell typescript it's any known type,
    // by claiming it's the MockHttpServer, even though it's probably not.
    // Additionally, we disable param-reassign, because here we intend to do it
    // so that we can mutate the input object.
    // eslint-disable-next-line no-param-reassign
    MockExecutors[mockType as '_case:MockHttpServer'] = setup as MockExecutor<
      '_case:MockHttpServer',
      CaseMockDescriptorFor<AnyMockDescriptor, '_case:MockHttpServer'>,
      unknown
    >;
    mockTypeToPluginHumanName[mockType] = description.humanReadableName;
  });

  Object.entries(plugin.matcherExecutors).forEach(
    ([pluginExecutorType, pluginExecutor]) => {
      if (pluginExecutorType in MatcherExecutors) {
        throw new CaseConfigurationError(
          `Plugin '${description.humanReadableName}' @ ${plugin.description.version} attempted to load a matcher executor for '${pluginExecutorType}', but one had already been loaded by plugin '${mockTypeToPluginHumanName[pluginExecutorType]}'.`,
          'DONT_ADD_LOCATION',
          'UNDOCUMENTED',
        );
      }
      if (pluginExecutorType.startsWith(`_case:`)) {
        context.logger.deepMaintainerDebug(
          `Core plugin '${description.humanReadableName}' @ ${plugin.description.version} registered a matcher executor with type '${pluginExecutorType}'`,
        );
      } else {
        context.logger.debug(
          `Plugin '${description.humanReadableName}' @ ${plugin.description.version} registered a matcher executor with type '${pluginExecutorType}'`,
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
  loadedPluginVersions[plugin.description.uniqueMachineName] =
    plugin.description.version;
};
