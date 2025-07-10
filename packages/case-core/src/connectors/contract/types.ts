import { LogPrinter } from '../logger/types';
import { ResultPrinter } from '../../entities/resultPrinter/types';

export interface TestPrinter extends LogPrinter, ResultPrinter {}

export interface ContractVerificationTestHandle {
  testName: string;
  testIndex: number;
  contractIndex: number;
}
