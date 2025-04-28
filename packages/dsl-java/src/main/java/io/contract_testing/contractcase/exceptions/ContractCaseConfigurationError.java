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

  private final String contractCaseErrorCode;

  public ContractCaseConfigurationError(@NotNull String message,
      @NotNull String contractCaseErrorCode) {
    super(message);
    this.location = Arrays.stream(Thread.currentThread().getStackTrace())
        .map(StackTraceElement::toString).collect(
            Collectors.joining());
    this.contractCaseErrorCode = contractCaseErrorCode;
  }

  /**
   * Indicates that there was an error with the user-provided configuration or contract
   *
   * @param message  The detail message
   * @param location Where this error happened (eg, "Java DSL")
   */
  public ContractCaseConfigurationError(@NotNull String message,
      @NotNull String location,
      @NotNull String contractCaseErrorCode) {
    super(message);
    this.location = location;
    this.contractCaseErrorCode = contractCaseErrorCode;
  }

  /**
   * Returns the location where the error happened
   *
   * @return The location
   */
  public String getLocation() {
    return this.location;
  }

  /**
   * Returns the error code from contract case, useful if you want to programmatically react to
   * different kinds of errors. See the reference documentation for more information.
   *
   * @return The error code, or "UNDOCUMENTED" if there is none.
   */
  public String getErrorCode() {
    return this.contractCaseErrorCode;
  }
}
