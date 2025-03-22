package io.contract_testing.contractcase;

import org.jetbrains.annotations.NotNull;

/**
 * Indicates that the expectations of a test were not met. Used to fail tests.
 * <p>
 * In a future version, we should integrate this with (eg) JUnit for nice reporting.
 */
public class ContractCaseExpectationsNotMet extends RuntimeException {

  private final String location;

  /**
   * Constructs a {@code ContractCaseExpectationsNotMet} exception
   *
   * @param message  What went wrong
   * @param location Where it went wrong (usually a descriptor generated from the interaction +
   *                 matcher)
   */
  public ContractCaseExpectationsNotMet(@NotNull String message, @NotNull String location) {
    super(message);
    this.location = location;
  }
  public String getLocation() {
    return location;
  }
}
