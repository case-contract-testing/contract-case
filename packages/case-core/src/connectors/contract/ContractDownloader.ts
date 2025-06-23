/* eslint-disable no-underscore-dangle */

import {
  DataContext,
  ResultFormatter,
  constructDataContext,
} from '@contract-case/case-plugin-base';
import type { CaseConfig, WriteContract } from '../../core/types';

import { configFromEnv, configToRunContext } from '../../core/config';
import { writerDependencies } from '../dependencies';
import { BrokerService } from '../../core/BrokerService';
import { TestPrinter } from './types';

export class ContractDownloader {
  context: DataContext;

  broker: BrokerService;

  writeContract: WriteContract;

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
    this.writeContract = dependencies.writeContract;
    this.resultPrinter = dependencies.resultFormatter;
  }

  async download(serviceName: string): Promise<void> {
    return this.broker
      .downloadContracts(serviceName, this.context)
      .then((caseContracts) =>
        caseContracts.map((c) => {
          this.context.logger.debug(`Writing contract '${c.name}'`);
          return this.writeContract(c.contractData, {
            ...this.context,
            '_case:currentRun:context:overwriteFile': true,
            '_case:currentRun:context:doNotWriteMainContract': true,
            '_case:currentRun:context:testRunId':
              c.contractData._links['pb:pact-version'].name,
          });
        }),
      )
      .then((filenames) => {
        filenames.forEach((details) =>
          this.resultPrinter.printDownloadedContract(
            details.contractPaths.join('; '),
            this.context,
          ),
        );
      });
  }
}
