import { BrokerService } from '../core/BrokerService';
import { ReaderDependencies, WriterDependencies } from '../core/types';
import { DataContext } from '../entities/types';
import { makeBrokerApi } from './broker';
import { writeContract } from './contractWriter';
import { makeEnvironment } from './environment/environment';
import { makeLogger } from './logger';
import { resultPrinter } from './resultPrinter';

export const writerDependencies: WriterDependencies = {
  resultPrinter,
  makeLogger,
  writeContract,
  makeEnvironment,
  makeBrokerService: (context: DataContext) =>
    new BrokerService(makeBrokerApi(context), makeEnvironment()),
};

export const readerDependencies: ReaderDependencies = {
  resultPrinter,
  makeLogger,
  makeBrokerApi,
  makeEnvironment,
};
