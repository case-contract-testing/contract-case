import { ContractCaseDslPlugin } from '@contract-case/case-plugin-base';

import { makeGenerator } from './generator/generator';
import { GeneratedFileWriter } from './generator/types';
import { javaGenerator } from './generator/java/javaGenerator';
import { tsGenerator } from './generator/ts/tsGenerator';
import { LanguageGenerator } from './types';
import { UnreachableError } from '../entities/errors/unreachableError';

/**
 * The languages that the generator can produce DSL classes for.
 */
export const TARGET_LANGUAGES = ['java', 'ts'] as const;

/**
 * A language that the generator can produce DSL classes for.
 */
export type TargetLanguage = (typeof TARGET_LANGUAGES)[number];

/**
 * Type guard to check whether a string names a supported target language.
 *
 * @param value - the string to check
 * @returns true if the string is a {@link TargetLanguage}
 */
export const isTargetLanguage = (value: string): value is TargetLanguage =>
  (TARGET_LANGUAGES as readonly string[]).includes(value);

const generatorFor = (language: TargetLanguage): LanguageGenerator => {
  switch (language) {
    case 'java':
      return javaGenerator;
    case 'ts':
      return tsGenerator;
    default:
      throw new UnreachableError('Unknown target language', language);
  }
};

/**
 * Generates the DSL classes declared by the given plugins, in each of the
 * given languages, writing the files with the given writer.
 *
 * @param plugins - the plugins (or bare DSL declarations with a description)
 * to generate DSL classes for
 * @param languages - the languages to generate
 * @param fileWriter - the writer that will receive the generated files. Note
 * that the generators build their own conventional paths beneath the writer's
 * base path (eg `src/main/java/...` for Java).
 * @returns a Promise that resolves once all files are written
 */
export const generateDsl = (
  plugins: ContractCaseDslPlugin[],
  languages: TargetLanguage[],
  fileWriter: GeneratedFileWriter,
): Promise<void> =>
  languages.reduce(
    (previousLanguages, language) =>
      previousLanguages.then(() => {
        const generator = makeGenerator(fileWriter, generatorFor(language));
        return plugins.reduce(
          (previousPlugins, plugin) =>
            previousPlugins.then(() => generator.process(plugin)),
          Promise.resolve(),
        );
      }),
    Promise.resolve(),
  );
