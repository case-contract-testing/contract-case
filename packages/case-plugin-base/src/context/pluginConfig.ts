import { CaseConfigurationError } from '../errors';
import { DataContext } from './types';

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
  pluginShortName: string,
): Record<string, unknown> => {
  const configDescription = {
    shortName: pluginShortName,
    // TODO: Get a long name from a passed in PluginDescription instead of
    // a hardcoded name here
    longName: 'Long name here',
  };
  if (!context['_case:currentRun:context:mockConfig']) {
    throw new CaseConfigurationError(
      `The plugin '${configDescription.shortName}' (${configDescription.longName}) requires the mockConfig configuration property to be set. Please check your configuration.`,
      context,
    );
  }
  if (
    !(
      configDescription.shortName in
      context['_case:currentRun:context:mockConfig']
    )
  ) {
    throw new CaseConfigurationError(
      `The plugin '${configDescription.shortName}' (${configDescription.longName}) requires the mockConfig configuration property to have a key '${configDescription.shortName}'. Please check your configuration.`,
      context,
    );
  }

  const pluginConfig =
    context['_case:currentRun:context:mockConfig'][configDescription.shortName];

  if (pluginConfig == null) {
    throw new CaseConfigurationError(
      `The mockConfig configuration key '${configDescription.shortName}' was set, but had no content (${configDescription.longName}). Please check your configuration.`,
      context,
    );
  }
  return pluginConfig;
};
