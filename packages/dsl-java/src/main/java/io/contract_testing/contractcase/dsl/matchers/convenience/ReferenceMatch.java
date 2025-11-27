package io.contract_testing.contractcase.dsl.matchers.convenience;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.lang.String;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches a named matcher created with the NamedMatch matcher.
 */
@Generated("@contract-case/case-definition-generator")
public class ReferenceMatch<M> {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The name you gave to a previous call of NamedMatch
   */
  @Getter
  @JsonProperty("_case:matcher:uniqueName")
  private final String uniqueName;

  @Builder
  public ReferenceMatch(@NotNull final String uniqueName) {
    this.type = "_case:Lookup";
    this.uniqueName = uniqueName;
  }
}
