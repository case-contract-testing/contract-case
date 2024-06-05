/**
 * Begin define
 *   - Begin define
 *      - Config
 *          - Statehandlers need to be callbacks
 *          - triggerAndTest needs to be a callback
 *      - LogPrinter is a callback
 *      - resultPrinter is a callback
 *      - Parent Versions
 *      - Returns ID
 *   - runExample
 *      Define ID
 *      json definition
 *      and config
 *   - runRejectingExample
 *      Define ID
 *      json definition
 *      and config
 *   - endRecord
 *      Define ID
 *      invalidates ID
 */

import { AnyCaseMatcherOrData } from '@contract-case/case-core';
import { versionString } from '../versionString';
import { mapConfig, mapConfigNoId } from './config';
import {
  ContractCaseConnectorConfig,
  DefinitionId,
  ExampleDefinition,
} from './types';
import {
  closeDefiner,
  createDefiner,
  getDefiner,
} from '../connectors/case-boundary/definer';
import { BoundaryResult, ILogPrinter, IResultPrinter } from '../entities/types';

export const beginDefinition = (
  config: ContractCaseConnectorConfig,
  callbackPrinter: ILogPrinter,
  resultPrinter: IResultPrinter,
  callerVersions: string[],
): DefinitionId =>
  createDefiner(mapConfigNoId(config), callbackPrinter, resultPrinter, [
    ...callerVersions,
    versionString,
  ]);

export const runExample = (
  defineId: string,
  definition: ExampleDefinition,
  config: ContractCaseConnectorConfig,
): Promise<BoundaryResult> =>
  Promise.resolve().then(() => {
    const definerHandle = getDefiner(defineId, 'runExample');
    if (!('id' in definerHandle)) {
      return definerHandle;
    }
    return definerHandle.definer.runExample(
      definition,
      mapConfig(config, defineId),
    );
  });

export const runRejectingExample = (
  defineId: string,
  definition: ExampleDefinition,
  config: ContractCaseConnectorConfig,
): Promise<BoundaryResult> =>
  Promise.resolve().then(() => {
    const definerHandle = getDefiner(defineId, 'runRejectingExample');
    if (!('id' in definerHandle)) {
      return definerHandle;
    }
    return definerHandle.definer.runRejectingExample(
      definition,
      mapConfig(config, defineId),
    );
  });

export const stripMatchers = (
  defineId: string,
  matcherOrData: AnyCaseMatcherOrData,
): BoundaryResult => {
  const definerHandle = getDefiner(defineId, 'stripMatchers');
  if (!('id' in definerHandle)) {
    return definerHandle;
  }
  return definerHandle.definer.stripMatchers(matcherOrData);
};

export const endRecord = (defineId: string): Promise<BoundaryResult> =>
  Promise.resolve().then(() => {
    const definerHandle = getDefiner(defineId, 'endRecord');
    if (!('id' in definerHandle)) {
      return definerHandle;
    }

    return definerHandle.definer.endRecord().finally(() => {
      closeDefiner(defineId);
    });
  });
