export interface BuildEnvironment {
  /**
   * What branch of the git repository is under test in this run
   *
   * @returns The branch name, or false if we
   *     are unable to determine the branch (eg, if
   *     we're not running in a git repository).
   */
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
