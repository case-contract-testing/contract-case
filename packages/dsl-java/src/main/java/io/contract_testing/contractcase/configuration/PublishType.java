package io.contract_testing.contractcase.configuration;


/**
 * Enum for the config option to control whether or not ContractCase publishes results.
 */
public enum PublishType {

  /**
   * Always publish contracts and verification statuses (not recommended, as it is not good practice
   * to publish from developer machines during routine test runs)
   */
  ALWAYS("ALWAYS"),

  /**
   * Don't publish contracts or verification statuses during this run
   */
  NEVER("NEVER"),

  /**
   * Only publish contracts or verification statuses when in CI according to <a
   * href="https://github.com/watson/ci-info#supported-ci-tools">ci-info</a>
   */
  ONLY_IN_CI("ONLY_IN_CI");

  private final String value;

  PublishType(String value) {
    this.value = value;
  }

  public String toString() {
    return value;
  }
}

