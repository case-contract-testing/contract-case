import { LogLevel } from '@contract-case/case-plugin-base';

export interface LogPrinter {
  log: (
    level: LogLevel,
    timestamp: string,
    version: string,
    typeString: string,
    location: string,
    message: string,
    additional: string,
  ) => Promise<void>;
}
