/* eslint-disable no-underscore-dangle */

import type { CaseConfig, WriteContract } from '../../core/types';

import type { DataContext, ResultFormatter } from '../../entities/types';
import { constructDataContext } from '../../entities/context';
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
    dependencies = writerDependencies(printer)
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
      dependencies.defaultConfig
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
            '_case:currentRun:context:testRunId':
              c.contractData._links['pb:pact-version'].name,
          });
        })
      )
      .then((filenames) => {
        filenames.forEach((filename) =>
          this.resultPrinter.printDownloadedContract(filename, this.context)
        );
      });
  }
}
