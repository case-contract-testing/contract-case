/**
 * Verify
 *  - Begin Verify
 *      - Config
 *          - Statehandlers need to be callbacks
 *          - triggerAndTest needs to be a callback
 *      - LogPrinter is a callback
 *      - resultPrinter is a callback
 *      - Parent Versions
 *      - Returns ID
 *
 *  - availableContractDescriptions
 *      - Verifier ID
 *      - Returns CaseContractDescription
 *
 *  - runVerification
 *      - Verifier ID
 *      - map config
 */

import {
  BoundaryResult,
  ILogPrinter,
  IResultPrinter,
  IRunTestCallback,
} from '@contract-case/case-boundary';
import { versionString } from '../versionString';
import { ContractCaseConnectorConfig, VerificationId } from '../domain/types';
import { mapConfig, mapConfigNoId } from './config';
import { closeVerifier, createVerifier, getVerifier } from './storage/verifier';

export const beginVerification = (
  config: ContractCaseConnectorConfig,
  callback: IRunTestCallback,
  callbackPrinter: ILogPrinter,
  resultPrinter: IResultPrinter,
  callerVersions: string[],
): VerificationId =>
  createVerifier(
    mapConfigNoId(config),
    callback,
    callbackPrinter,
    resultPrinter,
    [...callerVersions, versionString],
  );

export const availableContractDescriptions = (
  verifierId: string,
): Promise<BoundaryResult> =>
  Promise.resolve().then(() => {
    const verifierHandle = getVerifier(
      verifierId,
      'availableContractDescriptions',
    );
    if (!('id' in verifierHandle)) {
      return verifierHandle;
    }
    return verifierHandle.verifier.availableContractDescriptions();
  });

export const runVerification = (
  verifierId: string,
  config: ContractCaseConnectorConfig,
): Promise<BoundaryResult> =>
  Promise.resolve().then(() => {
    const definerHandle = getVerifier(verifierId, 'runVerification');
    if (!('id' in definerHandle)) {
      return definerHandle;
    }
    return definerHandle.verifier.runVerification(
      mapConfig(config, verifierId),
    );
  });

export const endVerification = (verifierId: string): Promise<void> =>
  Promise.resolve().then(() => closeVerifier(verifierId));
