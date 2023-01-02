export { StateFunctions } from 'entities/states/types';

export type RunTestCallback = (
  testName: string,
  verify: () => Promise<void>
) => void;
