package io.contract_testing.contractcase.configuration;

public enum ContractToWrite {

  /**
   * Write the main contract, without a hash in the filename
   */
  MAIN("main"),

  /**
   * Write the hashed contract, with the hash in the filename
   */
  HASH("hash");


  private final String contractToWrite;

  ContractToWrite(String contractToWrite) {
    this.contractToWrite = contractToWrite;
  }

  public String toString() {
    return this.contractToWrite;
  }
}
