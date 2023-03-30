/* eslint-disable no-underscore-dangle */

import type { CaseConfig, WriteContract } from '../../core/types';

import type { DataContext } from '../../entities/types';
import { constructDataContext } from '../../entities/context';
import { DEFAULT_CONFIG } from '../../core';
import { configToRunContext } from '../../core/config';
import { writerDependencies } from '../dependencies';
import { BrokerService } from '../../core/BrokerService';

export class ContractDownloader {
  context: DataContext;

  broker: BrokerService;

  writeContract: WriteContract;

  constructor(config: CaseConfig, dependencies = writerDependencies) {
    this.context = constructDataContext(
      dependencies.makeLogger,
      dependencies.resultPrinter,
      {
        ...configToRunContext(DEFAULT_CONFIG),
        ...configToRunContext(config),
      }
    );

    this.broker = dependencies.makeBrokerService(this.context);
    this.writeContract = dependencies.writeContract;
  }

  async download(serviceName: string): Promise<void> {
    return this.broker
      .downloadContracts(serviceName, this.context)
      .then((caseContracts) => {
        caseContracts.forEach((c) => {
          this.context.logger.debug(`Writing contract '${c.name}'`);
          this.writeContract(c.contractData, {
            ...this.context,
            'case:currentRun:context:overwriteFile': true,
            'case:currentRun:context:testRunId':
              c.contractData._links['pb:pact-version'].name,
          });
        });
      });
  }
}
