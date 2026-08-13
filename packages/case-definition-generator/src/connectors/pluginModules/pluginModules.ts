import {
  CaseConfigurationError,
  ContractCaseDslPlugin,
} from '@contract-case/case-plugin-base';
import {
  loadPluginModuleContents,
  mustResolvePlugin,
} from '@contract-case/case-entities-internal';

/**
 * Loads a plugin module by package name, and confirms it declares a DSL.
 *
 * The same loading rules apply as when loading a plugin for a test run: the
 * name must be a bare node package name (no paths or URIs), resolved from
 * the current working directory - so run this from the project that has the
 * plugin installed.
 *
 * @param moduleName - the name of the plugin package to load
 * @returns a Promise of the plugin, guaranteed to have a `dsl` property
 * @throws CaseConfigurationError (as a rejected Promise) if the module can't
 * be loaded, isn't a plugin, or doesn't declare a DSL
 */
export const loadDslPlugin = (
  moduleName: string,
): Promise<ContractCaseDslPlugin> =>
  loadPluginModuleContents(moduleName)
    .then((moduleContents) => mustResolvePlugin(moduleContents, moduleName))
    .then((plugin) => {
      if (plugin.dsl == null) {
        throw new CaseConfigurationError(
          `The plugin '${plugin.description.humanReadableName}' (loaded from '${moduleName}') doesn't have a 'dsl' property, so no matchers, states or interactions are declared, and there is nothing to generate. If you are the author of this plugin, see the plugin documentation for how to declare your DSL.`,
          'DONT_ADD_LOCATION',
          'BAD_DSL_DECLARATION',
        );
      }
      return plugin;
    });
