/* eslint-disable no-underscore-dangle */
import { makeLogger } from '../../connectors/logger';
import { resultPrinter } from '../../connectors/resultPrinter';

import type { CaseConfig } from '../../core/types';

import type { DataContext } from '../../entities/types';
import { constructDataContext } from '../../entities/context';
import { DEFAULT_CONFIG } from '../../core/contract';
import { configToRunContext } from '../../core/contract/config';
import { makeBrokerApi } from './broker';
import { writeContract } from './writer';

export class ContractDownloader {
  context: DataContext;

  constructor(config: CaseConfig) {
    this.context = constructDataContext(makeLogger, resultPrinter, {
      ...configToRunContext(DEFAULT_CONFIG),
      ...configToRunContext(config),
    });
  }

  async download(serviceName: string): Promise<void> {
    const broker = makeBrokerApi(this.context);

    const contractUrls = await broker.urlsForVerification(
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
        return broker
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
      writeContract(c.contractData, {
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
