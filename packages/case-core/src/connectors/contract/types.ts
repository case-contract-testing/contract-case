import { LogPrinter } from '../logger/types';
import { ResultPrinter } from '../../entities/resultPrinter/types';

export interface TestPrinter extends LogPrinter, ResultPrinter {}
