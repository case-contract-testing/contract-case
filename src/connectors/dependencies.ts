import { ReaderDependencies, WriterDependencies } from '../core/types';
import { makeBrokerApi } from './broker';
import { writeContract } from './contract/writer';
import { makeEnvironment } from './environment/environment';
import { makeLogger } from './logger';
import { resultPrinter } from './resultPrinter';

export const writerDependencies: WriterDependencies = {
  resultPrinter,
  makeLogger,
  makeBrokerApi,
  writeContract,
  makeEnvironment,
};

export const readerDependencies: ReaderDependencies = {
  resultPrinter,
  makeLogger,
  makeBrokerApi,
  makeEnvironment,
};
