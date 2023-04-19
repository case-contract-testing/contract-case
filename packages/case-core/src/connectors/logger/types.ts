import { LogLevel } from '../../entities/types';

export interface Printer {
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
