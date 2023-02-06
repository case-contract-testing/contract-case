export type RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>
) => void;
