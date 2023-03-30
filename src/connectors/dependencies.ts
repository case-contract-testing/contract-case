import { ReaderDependencies, WriterDependencies } from '../core/types';
import { makeBrokerApi } from './broker';
import { writeContract } from './contract/writer';
import { makeLogger } from './logger';
import { resultPrinter } from './resultPrinter';

export const writerDependencies: WriterDependencies = {
  resultPrinter,
  makeLogger,
  makeBrokerApi,
  writeContract,
};

export const readerDependencies: ReaderDependencies = {
  resultPrinter,
  makeLogger,
  makeBrokerApi,
};
