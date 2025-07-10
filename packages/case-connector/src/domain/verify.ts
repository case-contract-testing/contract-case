import {
  BoundaryInvokableFunction,
  BoundaryResult,
  BoundarySuccess,
  ILogPrinter,
  IResultPrinter,
  IRunTestCallback,
} from '../entities/types.js';
import { versionString } from '../entities/versionString.js';
import { ContractCaseConnectorConfig, VerificationId } from './types.js';
import { mapConfig, mapConfigNoId } from './config.js';
import {
  closeVerifier,
  createVerifier,
  getVerifier,
} from '../connectors/case-boundary/verifier.js';

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

/**
 * Registers a function that the core can invoke later.
 *
 * Note that this doesn't actually call the core, the function handles for
 * verification are cached until runVerification is called. This is so that
 * multiple verification invocations on the same verifier have the same
 *
 * @param defineId - The ID for the contract definer
 * @param handle - The handle / name to refer to this function later
 * @param invokeableFunction - The function to invoke
 * @returns A {@link BoundaryResult} promise indicating whether the function was registered successfully
 */
export const registerFunction = (
  verifierId: string,
  handle: string,
  invokeableFunction: BoundaryInvokableFunction,
): Promise<BoundaryResult> =>
  Promise.resolve().then(() => {
    const verifierHandle = getVerifier(verifierId, 'registerFunction');
    if (!('id' in verifierHandle)) {
      return verifierHandle;
    }
    verifierHandle.invokeableFunctions[handle] = invokeableFunction;
    return new BoundarySuccess();
  });

export const runVerification = (
  verifierId: string,
  config: ContractCaseConnectorConfig,
): Promise<BoundaryResult> =>
  Promise.resolve().then(() => {
    const verifierHandle = getVerifier(verifierId, 'runVerification');
    if (!('id' in verifierHandle)) {
      return verifierHandle;
    }
    return verifierHandle.verifier.runVerification(
      mapConfig(config, verifierId),
      verifierHandle.invokeableFunctions,
    );
  });

export const prepareVerificationTests = (
  verifierId: string,
  config: ContractCaseConnectorConfig,
): Promise<BoundaryResult> =>
  Promise.resolve().then(() => {
    const verifierHandle = getVerifier(verifierId, 'runVerification');
    if (!('id' in verifierHandle)) {
      return verifierHandle;
    }
    return verifierHandle.verifier.prepareVerificationTests(
      mapConfig(config, verifierId),
      verifierHandle.invokeableFunctions,
    );
  });

export const endVerification = (verifierId: string): Promise<void> =>
  Promise.resolve().then(() => closeVerifier(verifierId));
