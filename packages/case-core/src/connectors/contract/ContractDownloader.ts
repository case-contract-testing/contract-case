/* eslint-disable no-underscore-dangle */

import type { CaseConfig, WriteContract } from '../../core/types';

import type { DataContext, ResultPrinter } from '../../entities/types';
import { constructDataContext } from '../../entities/context';
import { configToRunContext } from '../../core/config';
import { writerDependencies } from '../dependencies';
import { BrokerService } from '../../core/BrokerService';
import { Printer } from '../logger/types';

export class ContractDownloader {
  context: DataContext;

  broker: BrokerService;

  writeContract: WriteContract;

  resultPrinter: ResultPrinter;

  constructor(
    config: CaseConfig,
    printer: Printer,
    dependencies = writerDependencies(printer)
  ) {
    this.context = constructDataContext(
      dependencies.makeLogger,
      dependencies.resultPrinter,
      {
        ...configToRunContext({ ...dependencies.defaultConfig, ...config }),
      },
      dependencies.defaultConfig
    );

    this.broker = dependencies.makeBrokerService(this.context);
    this.writeContract = dependencies.writeContract;
    this.resultPrinter = dependencies.resultPrinter;
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
