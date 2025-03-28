import {
  DataContext,
  ResultFormatter,
  constructDataContext,
} from '@contract-case/case-plugin-base';
import type { CaseConfig } from '../../core/types';

import { configFromEnv, configToRunContext } from '../../core/config';
import { writerDependencies } from '../dependencies';
import { BrokerService } from '../../core/BrokerService';
import { TestPrinter } from './types';

export class ContractDownloader {
  context: DataContext;

  broker: BrokerService;

  resultPrinter: ResultFormatter;

  constructor(
    config: CaseConfig,
    printer: TestPrinter,
    parentVersions: Array<string>,
    dependencies = writerDependencies(printer),
  ) {
    this.context = constructDataContext(
      dependencies.makeLogger,
      dependencies.resultFormatter,
      {
        ...configToRunContext({
          ...dependencies.defaultConfig,
          ...configFromEnv(),
          ...config,
        }),
      },
      dependencies.defaultConfig,
      parentVersions,
    );

    this.broker = dependencies.makeBrokerService(this.context);
    this.resultPrinter = dependencies.resultFormatter;
  }

  /**
   * Checks whether it's safe to deploy to a particular environment
   *
   * @param serviceName - The name of the service to check
   * @param environment - The environment to see if it's safe to deploy to
   * @returns Promise that resolves to true if it is safe to deploy, false otherwise.
   */
  async check(serviceName: string, environment: string): Promise<boolean> {
    return this.broker
      .canDeploy(serviceName, environment, this.context)
      .then((result) => {
        if (result.deployable) {
          this.resultPrinter.printDownloadedContract(
            `Safe to deploy '${serviceName}' to '${environment}'`,
            this.context,
          );
          return true;
        }
        this.resultPrinter.printDownloadedContract(
          `Not safe to deploy '${serviceName}' to '${environment}': ${result.reason}`,
          this.context,
        );
        return false;
      });
  }
}
