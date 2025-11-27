package io.contract_testing.contractcase.dsl.matchers.strings;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.lang.String;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches a JSON.stringify()ed version of the given object.
 */
@Generated("@contract-case/case-definition-generator")
public class StringifiedJson<M> {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The object to stringify. May also contain matchers
   */
  @Getter
  @JsonProperty("_case:matcher:object")
  private final M object;

  @Builder
  public StringifiedJson(@NotNull final M object) {
    this.type = "_case:JsonEncoded";
    this.object = object;
  }
}
