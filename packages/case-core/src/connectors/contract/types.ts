import { LogPrinter } from '../logger/types';
import { ResultPrinter } from '../resultPrinter/types';

export interface TestPrinter extends LogPrinter, ResultPrinter {}
