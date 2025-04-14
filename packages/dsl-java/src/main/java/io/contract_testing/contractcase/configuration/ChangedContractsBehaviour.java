package io.contract_testing.contractcase.configuration;

public enum ChangedContractsBehaviour {

  /**
   * Fail if attempting to write a contract that's different to the previous one
   */
  FAIL("FAIL"),

  /**
   * Replace the previous contract file if the new contract file is different
   */
  OVERWRITE("OVERWRITE");


  private final String changedContractsBehaviour;

  ChangedContractsBehaviour(String changedContractsBehaviour) {
    this.changedContractsBehaviour = changedContractsBehaviour;
  }

  public String toString() {
    return this.changedContractsBehaviour;
  }
}
