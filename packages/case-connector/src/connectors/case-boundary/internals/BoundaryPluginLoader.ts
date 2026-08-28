import { createRequire } from 'node:module';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import {
  CaseConfigurationError,
  CaseCoreError,
  PluginLoader,
  mustResolvePlugin,
} from '@contract-case/case-core';

import {
  ContractCaseBoundaryConfig,
  ILogPrinter,
  IResultPrinter,
  BoundaryResult,
  BoundarySuccess,
} from './boundary/index.js';
import { versionString } from '../../../entities/versionString.js';
import {
  convertConfig,
  jsErrorToFailure,
  wrapLogPrinter,
} from './mappers/index.js';

/**
 * Resolves a plugin module name against the user's project (ie, the current
 * working directory), falling back to normal resolution relative to this
 * file.
 *
 * The cwd resolution step exists because this code doesn't always run from
 * the user's project: when ContractCase is called from a host language like
 * Java, the connector runs from a temporary directory, so resolving relative
 * to this file would never find plugins the user installed in their project's
 * node_modules.
 *
 * @param moduleName - a previously validated bare module name
 * @returns the resolved path to the module, or null if it couldn't be
 * resolved from the working directory (in which case the caller should fall
 * back to normal resolution, so that this continues to work if the module is
 * resolvable from this file but not from the working directory).
 */
const resolveFromWorkingDirectory = (moduleName: string): string | null => {
  try {
    return createRequire(join(process.cwd(), 'noop.js')).resolve(moduleName);
  } catch {
    return null;
  }
};

const importSinglePlugin = (
  moduleName: string,
): Promise<ReturnType<typeof mustResolvePlugin>> =>
  Promise.resolve()
    .then(() => {
      if (
        // Forbid URIs
        moduleName.includes(':') ||
        // Forbid strings that start with '.', as they may be hidden files or path traversal
        moduleName.startsWith('.') ||
        // Forbid strings that start with / , as only local packages are supported
        moduleName.startsWith('/') ||
        // Forbid strings that don't look like node module names
        !/^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*(?:\/[a-z0-9][a-z0-9._-]*)*$/i.test(
          moduleName,
        )
      ) {
        throw new CaseConfigurationError(
          `Unsafe plugin module specifier. Plugin names must be a valid local nodejs package name, and may not be remote or inline URIs. Provided name was: '${moduleName}'`,
          'DONT_ADD_LOCATION',
          'INVALID_PLUGIN_NAME',
        );
      }
      const resolvedPath = resolveFromWorkingDirectory(moduleName);
      // webpack ignore is needed here so that the final bundle for host
      // languages is able to import arbitrary libs, without webpack failing
      return import(
        /* webpackIgnore: true */ resolvedPath != null
          ? pathToFileURL(resolvedPath).href
          : moduleName
      )
        .catch((e) => {
          // Some test environments can't do a dynamic import() at all (eg
          // Jest without --experimental-vm-modules). In those environments,
          // fall back to loading the plugin with require() instead.
          if (
            e != null &&
            (e.code === 'ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING' ||
              `${e.message}`.includes('--experimental-vm-modules'))
          ) {
            return createRequire(join(process.cwd(), 'noop.js'))(
              resolvedPath != null ? resolvedPath : moduleName,
            );
          }
          throw e;
        })
        .catch((e) => {
          throw new CaseConfigurationError(
            `Unable to load plugin '${moduleName}': ${e.message}\n\nPlease check that the plugin's package is installed (for example, with \`npm install --save-dev ${moduleName}\`) in the project the tests are running from.`,
            'DONT_ADD_LOCATION',
            'UNDOCUMENTED',
          );
        });
    })
    .then((moduleContents) => mustResolvePlugin(moduleContents, moduleName));

/**
 * A BoundaryPluginLoader allows loading plugins into the core
 *
 * @public
 */
export class BoundaryPluginLoader {
  private loader: PluginLoader | undefined;

  private readonly constructorConfig: ContractCaseBoundaryConfig;

  private readonly logPrinter: ILogPrinter;

  private readonly resultPrinter: IResultPrinter;

  private readonly parentVersions: string[];

  /**
   * @public
   * Construct a BoundaryContractDefiner to allow defining contracts.
   *
   * @param config - A ContractCaseBoundaryConfig object for the configuration
   * @param logPrinter - An ILogPrinter to enable printing logs
   * @param resultPrinter - An IResultPrinter to enable printing results
   * @param parentVersions - The names version(s) of the package(s) calling
   * this, where each entry in the array contains a name and version, with the
   * first entry in the array being the furthest package up the call stack.
   */
  constructor(
    config: ContractCaseBoundaryConfig,
    logPrinter: ILogPrinter,
    resultPrinter: IResultPrinter,
    parentVersions: string[],
  ) {
    this.constructorConfig = config;
    this.loader = undefined;
    this.logPrinter = logPrinter;
    this.resultPrinter = resultPrinter;
    // If invoked directly, we need to include our version
    if (!parentVersions.includes(versionString)) {
      this.parentVersions = [...parentVersions, versionString];
    } else {
      this.parentVersions = parentVersions;
    }
  }

  private initialiseLoader() {
    if (this.loader === undefined) {
      const { config } = convertConfig(this.constructorConfig);

      this.loader = new PluginLoader(
        config,
        wrapLogPrinter(this.logPrinter, this.resultPrinter),
        [...this.parentVersions],
      );
    }
  }

  async loadPlugins(moduleNames: string[]): Promise<BoundaryResult> {
    this.initialiseLoader();
    return Promise.all(
      moduleNames.map((moduleName) => importSinglePlugin(moduleName)),
    )
      .then((plugins) => {
        if (this.loader == null) {
          throw new CaseCoreError(
            'this.loader was not initialised during loadPlugins. This should never happen, as initialiseLoader() is meant to be called first',
          );
        }
        this.loader.loadPlugins(plugins);
      })
      .then(() => new BoundarySuccess())
      .catch(jsErrorToFailure);
  }
}
