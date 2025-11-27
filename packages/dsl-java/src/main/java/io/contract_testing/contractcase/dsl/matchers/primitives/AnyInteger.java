package io.contract_testing.contractcase.dsl.matchers.primitives;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.lang.Integer;
import java.lang.String;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches any integer.<pre>{@code   Use this when your code expects an integer, but you don't care what it is.
 * }</pre>
 */
@Generated("@contract-case/case-definition-generator")
public class AnyInteger<M> {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * An example integer to use during contract definition
   */
  @Getter
  @JsonProperty("_case:matcher:example")
  private final Integer example;

  @Getter
  @JsonProperty("_case:context:matchBy")
  @JsonInclude(Include.ALWAYS)
  public final String matchBy = "type";

  @Builder
  public AnyInteger(@NotNull final Integer example) {
    this.type = "_case:Integer";
    this.example = example;
  }
}
