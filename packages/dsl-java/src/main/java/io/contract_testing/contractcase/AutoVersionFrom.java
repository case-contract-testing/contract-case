package io.contract_testing.contractcase;

/**
 * Enum to configure where ContractCase gets the version for the system under test
 */
public enum AutoVersionFrom {

  /**
   * Uses <a href="https://www.npmjs.com/package/absolute-version">absolute-version</a> to determine
   * the version, ideally from the git tag
   */
  TAG("TAG"),

  /**
   * Uses the full git sha as the version for the system under test
   */
  GIT_SHA("GIT_SHA");

  private final String autoVersionFrom;

  AutoVersionFrom(String autoVersionFrom) {
    this.autoVersionFrom = autoVersionFrom;
  }

  public String toString() {
    return this.autoVersionFrom;
  }
}
