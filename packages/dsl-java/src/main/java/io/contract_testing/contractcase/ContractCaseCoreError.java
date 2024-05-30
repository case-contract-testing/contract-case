package io.contract_testing.contractcase;

import java.util.Arrays;
import java.util.stream.Collectors;
import org.jetbrains.annotations.NotNull;

public class ContractCaseCoreError extends RuntimeException {

  private final String location;

  public ContractCaseCoreError(@NotNull String message) {
    super(message);
    this.location = Arrays.stream(Thread.currentThread().getStackTrace())
        .map(StackTraceElement::toString)
        .collect(
            Collectors.joining("\n"));
  }

  public ContractCaseCoreError(@NotNull String message, @NotNull String location) {
    super(message);
    this.location = location;
  }

  public ContractCaseCoreError(Throwable e) {
    super(e.getMessage());
    if (e instanceof ContractCaseCoreError) {
      this.location = ((ContractCaseCoreError) e).getLocation();
    } else {
      this.location = ConnectorExceptionMapper.stackTraceToString(e);
    }
  }

  public ContractCaseCoreError(@NotNull String message, Throwable cause) {
    super(message + "(" + cause.getMessage() + ")", cause);
    if (cause instanceof ContractCaseCoreError) {
      this.location = ((ContractCaseCoreError) cause).getLocation();
    } else {
      this.location = ConnectorExceptionMapper.stackTraceToString(cause);
    }
  }

  public String getLocation() {
    return location;
  }
}
