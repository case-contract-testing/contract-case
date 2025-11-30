package io.contract_testing.contractcase.dsl.matchers.convenience;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import java.lang.String;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;

/**
 * Alters the ContractCase log level below this matcher. Useful for debugging.<p>This has no effect on matching.<p>Note that this log level matcher will be saved into the contract, so it will also affect the log level during verification. Usually you will want to remove the use of this matcher before saving the contract.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class ChangeLogLevel<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The new LogLevel. One of "none" | "error" | "warn" | "debug" | "maintainerDebug" | "deepMaintainerDebug". see <a href="https://case.contract-testing.io/docs/reference/configuring#loglevel-none--error--warn--debug--maintainerdebug">LogLevel</a> for details
   */
  @Getter
  @JsonProperty("_case:currentRun:context:logLevel")
  private final String logLevel;

  /**
   * The next matcher in the tree.
   */
  @Getter
  @JsonProperty("_case:matcher:child")
  private final M child;

  @Builder
  public ChangeLogLevel(
    @NotNull final String logLevel,
    @NotNull final M child
  ) {
    this.type = "_case:CascadingContext";
    this.logLevel = logLevel;
    this.child = child;
  }
}
