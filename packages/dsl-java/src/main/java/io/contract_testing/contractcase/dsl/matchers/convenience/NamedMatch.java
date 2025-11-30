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
 * Saves the matcher below it with a unique name that can be used with lookups
 * in tests after this one. Lookups can be made with the ReferenceMatch matcher.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class NamedMatch<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The name you can use to lookup this matcher later. If you have two matcher with the same unique name, their contents must be identical.
   */
  @Getter
  @JsonProperty("_case:matcher:uniqueName")
  private final String uniqueName;

  /**
   * The next matcher in the tree.
   */
  @Getter
  @JsonProperty("_case:matcher:child")
  private final M child;

  @Builder
  public NamedMatch(@NotNull final String uniqueName, @NotNull final M child) {
    this.type = "_case:Lookup";
    this.uniqueName = uniqueName;
    this.child = child;
  }
}
