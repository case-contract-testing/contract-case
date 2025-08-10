import {
  DataContext,
  ResultFormatter,
  LogLevelContext,
  Logger,
} from '@contract-case/case-plugin-base';
import { BrokerService } from './BrokerService';
import { DefaultConfig } from './config/types';
import { MakeContractStore } from './types.ContractReader';
import { MakeBrokerApi } from './types.broker';
import { WriteContract } from './types.contract';
import { MakeEnvironment } from './types.environment';

export * from './types.broker';
export * from './types.contract';
export * from './types.environment';

export { CaseConfig } from './config/types';

/**
 * Returned by the core after a successful write of a contract
 */
export interface ContractWriteSuccess {
  /* The path(s) to the contract files written */
  contractPaths: Array<string>;
  /* The consumer slug (ie, the consumer part of the filename), normalised
   * however ContractCase chose to normalise it */
  consumerSlug: string;
  /* The provider slug (ie, the provider part of the filepath), normalised
   * however ContractCase chose to normalise it */
  providerSlug: string;
}

/**
 * Returned by the core when the verifier asks to get the tests
 */
export interface ContractVerificationTest {
  /**
   * The index for this test. Can be used by the the test runner to actually run this test
   */
  index: number;
  /**
   * The name of this test, for display
   */
  testName: string;
  /**
   * Whether or not the test is pending
   * @returns true if this test has been run, false otherwise
   */
  isPending: () => boolean;
  /**
   * Call this to tell the ContractCase core to actually invoke the test.
   *
   * Note that by default during verification, a failed verification test doesn't
   * necessarily reject the promise, but failed configuration or core bugs will.
   *
   * This is the intended default behaviour - as a failed verification doesn't
   * necessarily indicate a problem in the code that is being verified.
   * For example, it might be an expectation that is not implemented yet, or it
   * might be an old contract.
   *
   * This behaviour can be changed with the configuration setting `throwOnFail`
   *
   * @returns a successful promise that indicates the result of this test, with the
   * caveats above. If the promise rejects, it indicates the why in the enclosed exception
   */
  runTest: () => Promise<void>;
}

export type MakeBrokerService = (context: DataContext) => BrokerService;

export interface ReaderDependencies {
  defaultConfig: DefaultConfig;
  resultFormatter: ResultFormatter;
  makeLogger: (context: LogLevelContext) => Logger;
  makeBrokerApi: MakeBrokerApi;
  makeEnvironment: MakeEnvironment;
  makeContractStore: MakeContractStore;
  makeBrokerService: MakeBrokerService;
}

export interface WriterDependencies {
  defaultConfig: DefaultConfig;
  resultFormatter: ResultFormatter;
  makeLogger: (context: LogLevelContext) => Logger;
  writeContract: WriteContract;
  makeEnvironment: MakeEnvironment;
  makeBrokerService: MakeBrokerService;
}
