import { GeneratorLogger } from '../domain/types';
import { TargetLanguage, generateDsl } from '../domain/generateDsl';
import { makeFileWriter } from './generatedFileWriter';
import { loadDslPlugin } from './pluginModules';
import { logger as defaultLogger } from './logger';

/**
 * Loads the given plugin packages by name, and generates the DSL classes
 * they declare into the given output directory.
 *
 * This is the entry point used by the ContractCase CLI's
 * `generate-plugin-dsl` command.
 *
 * @param moduleNames - the names of the plugin packages to generate DSLs
 * for. These must be installed in the current project - the same loading
 * rules apply as when loading a plugin for a test run.
 * @param languages - the languages to generate
 * @param outputDir - the base directory to write into. The generators build
 * their own conventional paths beneath this (eg `src/main/java/...` for
 * Java, `src/boundaries/dsl/...` for TypeScript), so this should be the root
 * of the package the generated files will belong to.
 * @param logger - an optional logger; defaults to logging to standard out
 * @returns a Promise that resolves once all files are written
 */
export const generatePluginDsl = (
  moduleNames: string[],
  languages: TargetLanguage[],
  outputDir: string,
  logger: GeneratorLogger = defaultLogger,
): Promise<void> =>
  Promise.all(moduleNames.map((name) => loadDslPlugin(name))).then((plugins) =>
    generateDsl(plugins, languages, makeFileWriter(outputDir, logger)),
  );
