/* eslint-disable no-underscore-dangle */

import type { Broker, CaseConfig, WriteContract } from '../../core/types';

import type { DataContext } from '../../entities/types';
import { constructDataContext } from '../../entities/context';
import { DEFAULT_CONFIG } from '../../core';
import { configToRunContext } from '../../core/config';
import { writerDependencies } from '../dependencies';

export class ContractDownloader {
  context: DataContext;

  broker: Broker;

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

    this.broker = dependencies.makeBrokerApi(
      this.context,
      dependencies.makeEnvironment()
    );
    this.writeContract = dependencies.writeContract;
  }

  async download(serviceName: string): Promise<void> {
    const contractUrls = await this.broker.urlsForVerification(
      serviceName,
      this.context
    );
    this.context.logger.maintainerDebug('URLs are:', contractUrls);

    if (contractUrls.length === 0) {
      this.context.logger.warn(
        'No contracts to verify. This may be normal if there is nothing to verify for this service'
      );
      return;
    }
    const contracts = await Promise.all(
      contractUrls.map((contractUrl) => {
        this.context.logger.debug(
          `Downloading contract for '${contractUrl.name}' from ${contractUrl.href}`
        );
        return this.broker
          .downloadContract(contractUrl.href, this.context)
          .then((contractData) => ({
            contractData,
            name: contractUrl.name,
          }));
      })
    );

    const nonCaseContracts = contracts.filter(
      (c) =>
        !(
          'contractType' in c.contractData &&
          c.contractData.contractType === 'case::contract'
        )
    );

    nonCaseContracts.forEach((c) => {
      this.context.logger.debug(
        `Skipping contract '${c.name}' as it does not appear to be a Case Contract`
      );
    });

    const caseContracts = contracts.filter(
      (c) =>
        'contractType' in c.contractData &&
        c.contractData.contractType === 'case::contract'
    );
    caseContracts.forEach((c) => {
      this.context.logger.debug(`Writing contract '${c.name}'`);
      this.writeContract(c.contractData, {
        ...this.context,
        'case:currentRun:context:overwriteFile': true,
        'case:currentRun:context:testRunId':
          c.contractData._links['pb:pact-version'].name,
      });
    });

    if (caseContracts.length === 0) {
      this.context.logger.warn(
        `No Case contracts to verify. There were ${nonCaseContracts.length} non-case contracts.`
      );
      this.context.logger.warn(
        'You can see more information by re-running this task with logLevel: debug or lower'
      );
    }
  }
}
