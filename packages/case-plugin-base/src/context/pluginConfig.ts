import { CaseConfigurationError } from '../errors';
import { PluginDescription } from '../types';
import { DataContext, MatchContext } from './types';

/**
 * Overwrites the value of '_case:currentRun:context:pluginProvided'
 * with the provided context. Generally you want to call this once per
 * interaction executor entry function.
 *
 * @param parentContext - Context to extend with provided context
 * @param providedContext - Context that your plugin is providing
 * @returns A copy of the context, with the given plugin-provided context set.
 */
export const providePluginContext = (
  parentContext: MatchContext,
  providedContext: Record<string, string>,
): MatchContext => ({
  ...parentContext,
  '_case:currentRun:context:pluginProvided': providedContext,
});

/**
 * Gets the plugin configuration (the mockConfig object keyed by your plugin
 * short name) for the given plugin. This function validates the context and
 * throws {@link CaseConfigurationError} if the mockConfig object is not set
 * or the key is missing. You don't need to catch this exception, you can let
 * it bubble up to the framework for it to be rendered to the user.
 *
 * This function doesn't know the expected shape of your configuration object;
 * it's up to you to then validate the object has the appropriate fields set
 * to valid values.
 * @public
 *
 * @param context - the current {@link MatchContext}
 * @param pluginShortName - the short name for the currently executing plugin
 * @returns the value of `mockConfig[pluginShortName]`
 * @throws CaseConfigurationError if the expected configuration keys are not
 * set, or are set but not defined.
 */
export const getPluginConfig = (
  context: DataContext,
  description: PluginDescription,
): Record<string, unknown> => {
  if (!context['_case:currentRun:context:mockConfig']) {
    throw new CaseConfigurationError(
      `The plugin '${description.humanReadableName}' requires the mockConfig configuration property to be set with a key of '${description.shortName}'. Please check your configuration.`,
      context,
    );
  }
  if (
    !(description.shortName in context['_case:currentRun:context:mockConfig'])
  ) {
    throw new CaseConfigurationError(
      `The plugin '${description.humanReadableName}' requires the mockConfig configuration property to have a key '${description.shortName}'. Please check your configuration.`,
      context,
    );
  }

  const pluginConfig =
    context['_case:currentRun:context:mockConfig'][description.shortName];

  if (pluginConfig == null) {
    throw new CaseConfigurationError(
      `The mockConfig configuration key '${description.shortName}' was set, but had no content (${description.humanReadableName}). Please check your configuration.`,
      context,
    );
  }
  return pluginConfig;
};
