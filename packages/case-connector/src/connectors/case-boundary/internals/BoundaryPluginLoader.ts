import {
  CaseConfigurationError,
  CaseCoreError,
  PluginLoader,
} from '@contract-case/case-core';

import {
  ContractCaseBoundaryConfig,
  ILogPrinter,
  IResultPrinter,
  BoundaryResult,
} from './boundary/index.js';
import { versionString } from '../../../versionString.js';
import { convertConfig, jsErrorToFailure, wrapLogPrinter } from './mappers/index.js';
import { BoundarySuccess } from './index.js';

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
      moduleNames.map(
        // webpack ignore is needed here so that the final bundle for host
        // languages is able to import arbitrary libs, without webpack failing
        (moduleName) => import(/* webpackIgnore: true */ moduleName),
      ),
    )
      .then(
        (plugins) => {
          if (this.loader == null) {
            throw new CaseCoreError(
              'this.loader was not initialised during loadPlugins. This should never happen, as initialiseLoader() is meant to be called first',
            );
          }
          this.loader.loadPlugins(plugins);
        },
        (e) => {
          throw new CaseConfigurationError(
            `Unable to load plugin: ${e.message}`,
          );
        },
      )
      .then(() => new BoundarySuccess())
      .catch(jsErrorToFailure);
  }
}
