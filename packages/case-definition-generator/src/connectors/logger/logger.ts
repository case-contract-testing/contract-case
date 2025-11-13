import { GeneratorLogger } from '../../domain/types';

/* eslint-disable no-console */
export const logger: GeneratorLogger = {
  info: (message: string, ...additional: unknown[]): void =>
    console.log(`[ ] ${message}`, ...additional),
};
