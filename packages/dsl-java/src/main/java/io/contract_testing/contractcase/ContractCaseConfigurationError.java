package io.contract_testing.contractcase;

import java.util.Arrays;
import java.util.stream.Collectors;
import org.jetbrains.annotations.NotNull;

public class ContractCaseConfigurationError extends RuntimeException {

  private final String location;

  public ContractCaseConfigurationError(@NotNull String message) {
    super(message);
    this.location = Arrays.stream(Thread.currentThread().getStackTrace())
        .map(StackTraceElement::toString).collect(
            Collectors.joining());
  }

  public ContractCaseConfigurationError(@NotNull String message, @NotNull String location) {
    super(message);
    this.location = location;
  }

  public String getLocation() {
    return location;
  }
}
