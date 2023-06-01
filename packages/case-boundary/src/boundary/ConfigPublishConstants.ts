/**
 * Convenience class to hold the values for the publish setting so that clients don't need to know the strings
 */
export class ConfigPublishConstants {
  /**
   * Only publish contracts and verification results when in in CI according to https://github.com/watson/ci-info#supported-ci-tools
   */
  static readonly ONLY_IN_CI = 'ONLY_IN_CI';

  /**
   * Never publish contracts or verification results
   */
  static readonly NEVER = 'NEVER';

  /**
   * Always publish contracts and verification results
   */
  static readonly ALWAYS = 'ALWAYS';
}
