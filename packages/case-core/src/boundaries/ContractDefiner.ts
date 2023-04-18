import {
  ContractDefinerConnector,
  DefinitionFailingExample,
  DefinitionSuccessExample,
} from '../connectors';
import { MultiTestInvoker } from '../core/executeExample/types';
import { CaseConfig } from '../core/types';
import {
  AnyCaseNodeType,
  AnyData,
  AnyMockDescriptorType,
  ContractDescription,
  DataOrCaseNodeFor,
} from '../entities/types';

export class ContractDefiner<M extends AnyMockDescriptorType> {
  coreDefiner: ContractDefinerConnector<M>;

  constructor(
    description: ContractDescription,
    config: CaseConfig,
    invoker: MultiTestInvoker<M>
  ) {
    this.coreDefiner = new ContractDefinerConnector(
      description,
      config,
      invoker
    );
  }

  runExample<T extends AnyMockDescriptorType, R>(
    definition: DefinitionSuccessExample<T, R>,
    runConfig: CaseConfig = {}
  ): Promise<unknown> {
    return this.coreDefiner.runExample(definition, runConfig);
  }

  runRejectingExample<T extends AnyMockDescriptorType, R>(
    definition: DefinitionFailingExample<T, R>,
    runConfig: CaseConfig = {}
  ): Promise<unknown> {
    return this.coreDefiner.runRejectingExample(definition, runConfig);
  }

  endRecord(): Promise<unknown> {
    return this.coreDefiner.endRecord();
  }

  stripMatchers<T extends AnyCaseNodeType>(
    matcherOrData: DataOrCaseNodeFor<T>
  ): AnyData {
    return this.coreDefiner.stripMatchers(matcherOrData);
  }
}
