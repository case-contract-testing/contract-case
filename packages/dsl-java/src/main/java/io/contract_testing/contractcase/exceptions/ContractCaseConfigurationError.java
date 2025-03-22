package io.contract_testing.contractcase.exceptions;

import java.util.Arrays;
import java.util.stream.Collectors;
import org.jetbrains.annotations.NotNull;

/**
 * Indicates that there was an error with the user-provided configuration, interaction description
 * or contract file. Should only be used to indicate a problem that the user (or the author of the
 * contract) can correct.
 */
public class ContractCaseConfigurationError extends RuntimeException {

  private final String location;

  public ContractCaseConfigurationError(@NotNull String message) {
    super(message);
    this.location = Arrays.stream(Thread.currentThread().getStackTrace())
        .map(StackTraceElement::toString).collect(
            Collectors.joining());
  }

  /**
   * Indicates that there was an error with the user-provided configuration or contract
   *
   * @param message  The detail message
   * @param location Where this error happened (eg, "Java DSL")
   */
  public ContractCaseConfigurationError(@NotNull String message, @NotNull String location) {
    super(message);
    this.location = location;
  }

  /**
   * Returns the location where the error happened
   *
   * @return The location
   */
  public String getLocation() {
    return location;
  }
}
