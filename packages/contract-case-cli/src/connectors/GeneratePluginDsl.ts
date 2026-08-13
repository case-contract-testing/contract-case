import {
  TargetLanguage,
  generatePluginDsl as runGeneration,
  isTargetLanguage,
} from '@contract-case/definition-generator';
import { CaseConfigurationError } from '@contract-case/case-core';

const mapLanguages = (languages: string): TargetLanguage[] =>
  languages.split(',').map((language) => {
    const trimmed = language.trim();
    if (!isTargetLanguage(trimmed)) {
      throw new CaseConfigurationError(
        `'${trimmed}' isn't a language that the DSL generator supports. Supported languages are: java, ts`,
        'DONT_ADD_LOCATION',
        'INVALID_CONFIG',
      );
    }
    return trimmed;
  });

/**
 * Generates the DSL classes declared by a plugin package.
 *
 * @param pluginModule - the name of an installed plugin package
 * @param languages - comma separated list of languages to generate
 * @param outputDir - base directory to generate into
 * @returns a promise that resolves when generation is complete
 */
export const generatePluginDsl = (
  pluginModule: string,
  languages: string,
  outputDir: string,
): Promise<void> => runGeneration([pluginModule], mapLanguages(languages), outputDir);
