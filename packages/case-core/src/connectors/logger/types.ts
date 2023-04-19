import { LogLevel } from '../../entities/types';

export interface LogPrinter {
  log: (
    level: LogLevel,
    timestamp: string,
    version: string,
    typeString: string,
    location: string,
    message: string,
    additional: string
  ) => void;
}
