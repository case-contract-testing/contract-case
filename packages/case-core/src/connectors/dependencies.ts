import { BrokerService } from '../core/BrokerService';
import {
  CaseConfig,
  ReaderDependencies,
  WriterDependencies,
} from '../core/types';
import { DataContext, LogLevelContext } from '../entities/types';
import { makeBrokerApi } from './broker';
import { writeContract } from './contractStore';
import { makeEnvironment } from './BuildEnvironment/BuildEnvironment';
import { makeLogger } from './logger';
import { resultPrinter } from './resultPrinter';
import { DEFAULT_TEST_ID } from '../core';
import { makeContractStore } from './contractStore/contractReader';
import { Printer } from './logger/types';

const DEFAULT_CONFIG: CaseConfig = {
  logLevel: 'warn',
  contractDir: 'case-contracts',
  publish: 'ONLY_IN_CI',
  printResults: true,
  testRunId: DEFAULT_TEST_ID,
};

export const writerDependencies: (printer: Printer) => WriterDependencies = (
  printer
) => ({
  defaultConfig: { ...DEFAULT_CONFIG, throwOnFail: true },
  resultPrinter,
  makeLogger: (context: LogLevelContext) => makeLogger(context, printer),
  writeContract,
  makeEnvironment,
  makeBrokerService: (context: DataContext) =>
    new BrokerService(makeBrokerApi(context), makeEnvironment()),
});

export const readerDependencies: (printer: Printer) => ReaderDependencies = (
  printer
) => ({
  defaultConfig: { ...DEFAULT_CONFIG, throwOnFail: false },
  resultPrinter,
  makeLogger: (context: LogLevelContext) => makeLogger(context, printer),
  makeBrokerApi,
  makeEnvironment,
  makeContractStore,
  makeBrokerService: (context: DataContext) =>
    new BrokerService(makeBrokerApi(context), makeEnvironment()),
});
