package io.contract_testing.contractcase.logs;

import io.contract_testing.contractcase.logs.PrintableMatchError;
import io.contract_testing.contractcase.logs.PrintableMessageError;
import io.contract_testing.contractcase.logs.PrintableTestTitle;
import org.jetbrains.annotations.NotNull;

/**
 * Interface for printing logs and test results
 */
public interface LogPrinter {

  void log(@NotNull String level, @NotNull String timestamp,
      @NotNull String version, @NotNull String typeString, @NotNull String location,
      @NotNull String message, @NotNull String additional);

  void printMatchError(
      @NotNull PrintableMatchError description);

  void printMessageError(
      @NotNull PrintableMessageError description);

  void printTestTitle(@NotNull PrintableTestTitle titleDetails);
}
