import {
  BoundaryAnyMatcher,
  BoundaryContractDefiner,
  BoundaryMockDefinition,
} from '@contract-case/case-connector/cjs';
import { interactions } from '@contract-case/case-definition-dsl';

import { defaultPrinter } from './defaultTestPrinter.js';

import {
  ContractCaseConfig,
  ContractWriteSuccess,
  IndividualFailedTestConfig,
  IndividualSuccessTestConfig,
  versionString,
} from '../entities/index.js';
import {
  mapSuccess,
  mapConfig,
  mapSuccessConfig,
  mapFailingConfig,
  mapSuccessWithAny,
  mapInvokeableFunction,
} from './case-boundary/index.js';
import { errorHandler } from './handler.js';

const mapDefinition = (
  definition: ExampleDefinition,
): BoundaryMockDefinition => ({
  states: Array.isArray(definition.states) ? definition.states : [],
  definition: definition.definition,
});

export type ExampleDefinition = {
  // TODO types for states
  states?: Array<unknown>;
  definition: interactions.base.AnyInteractionDescriptor;
};

export class ContractCaseDefiner {
  private boundaryDefiner: BoundaryContractDefiner;

  private config: ContractCaseConfig;

  constructor(config: ContractCaseConfig) {
    this.config = config;
    try {
      this.boundaryDefiner = new BoundaryContractDefiner(
        mapConfig({ ...config }),
        defaultPrinter,
        defaultPrinter,
        [versionString],
      );
    } catch (e) {
      // Hack since this object isn't constructed anyway
      this.boundaryDefiner = 'UNASSIGNED' as unknown as BoundaryContractDefiner;
      errorHandler(e as Error);
    }
  }

  runInteraction<OtherR, OtherC extends Record<string, string>>(
    definition: ExampleDefinition,
    runConfig: IndividualSuccessTestConfig<OtherR, OtherC> = {},
  ): Promise<unknown> {
    return this.boundaryDefiner
      .runInteraction(
        mapDefinition(definition),
        mapSuccessConfig({ ...this.config, ...runConfig }),
      )
      .then(mapSuccess)
      .catch(errorHandler);
  }

  runRejectingInteraction<OtherR, OtherC extends Record<string, string>>(
    definition: ExampleDefinition,
    runConfig: IndividualFailedTestConfig<OtherR, OtherC> = {},
  ): Promise<unknown> {
    return this.boundaryDefiner
      .runRejectingInteraction(
        mapDefinition(definition),
        mapFailingConfig({ ...this.config, ...runConfig }),
      )
      .then(mapSuccess)
      .catch(errorHandler);
  }

  endRecord(): Promise<ContractWriteSuccess> {
    return this.boundaryDefiner
      .endRecord()
      .then((result) => mapSuccessWithAny<ContractWriteSuccess>(result))
      .catch(errorHandler);
  }

  registerFunction(
    handle: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invokeableFn: (...args: any[]) => any,
  ): void {
    try {
      return mapSuccess(
        this.boundaryDefiner.registerFunction(
          handle,
          mapInvokeableFunction(invokeableFn),
        ),
      );
    } catch (e) {
      return errorHandler(e as Error);
    }
  }

  stripMatchers<T>(matcherOrData: unknown): T {
    try {
      return mapSuccessWithAny(
        this.boundaryDefiner.stripMatchers(matcherOrData as BoundaryAnyMatcher),
      );
    } catch (e) {
      return errorHandler(e as Error);
    }
  }
}
