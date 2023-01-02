export { StateFunctions } from 'entities/nodes/states/types';

export type RunTestCallback = (
  testName: string,
  verify: () => Promise<void>
) => void;
