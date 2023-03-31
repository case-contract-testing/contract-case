export interface BuildEnvironment {
  branch(): string | false;
  /**
   * Do we think the current environment is running in a CI server?
   */
  isCi(): boolean;

  /**
   * Get the version for this service
   */
  version(): string;
}

export type MakeEnvironment = () => BuildEnvironment;
