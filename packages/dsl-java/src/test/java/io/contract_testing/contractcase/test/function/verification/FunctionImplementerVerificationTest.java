package io.contract_testing.contractcase.test.function.verification;


import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractVerifier;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.InteractionSetup;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.configuration.TriggerGroup;
import io.contract_testing.contractcase.configuration.TriggerGroups;
import io.contract_testing.contractcase.exceptions.FunctionCompletedExceptionally;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

public class FunctionImplementerVerificationTest {

  static final ObjectMapper mapper = new ObjectMapper();

  private static final ContractVerifier contract = new ContractVerifier(
      ContractCaseConfigBuilder.aContractCaseConfig()
          .consumerName("Java Function Implementer Example")
          .providerName("Java Function Caller Example")
          .publish(PublishType.NEVER)
          .build());

  private String parse(String json) {
    try {
      return new ObjectMapper().readValue(json, String.class);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  @Test
  public void testVerify() throws InterruptedException {

    contract.runVerification(ContractCaseConfigBuilder.aContractCaseConfig()
        //  .logLevel(LogLevel.MAINTAINER_DEBUG)
        .printResults(true)
        .throwOnFail(true)
        //   .logLevel(LogLevel.MAINTAINER_DEBUG)
        .triggers(new TriggerGroups().addTriggerGroup(new TriggerGroup<>(
                    "An invocation of PageNumbers( <any integer> )",
                    (InteractionSetup setupInfo) -> {
                      return parse(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                          .apply(List.of("2")));
                    },
                    Map.ofEntries(
                        Map.entry(
                            "returning \"2 pages\"", (String result, InteractionSetup setupInfo) -> {
                              assertThat(result).isEqualTo("2 pages");
                            }
                        ),
                        Map.entry(
                            "returns \"2 pages\"", (String result, InteractionSetup setupInfo) -> {
                              assertThat(result).isEqualTo("2 pages");
                            }
                        ),
                        Map.entry(
                            "\"2 pages\"", (String result, InteractionSetup setupInfo) -> {
                              assertThat(result).isEqualTo("2 pages");
                            }
                        )
                    ),
                    Map.of()
                )).addTriggerGroup(new TriggerGroup<>(
                    "An invocation of NoArgFunction()",
                    (InteractionSetup setupInfo) -> {
                      return parse(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                          .apply(List.of()));
                    },
                    Map.ofEntries(
                        Map.entry(
                            "returning null",
                            (String result, InteractionSetup setupInfo) -> {
                            }
                        ),
                        Map.entry("returns null", (String result, InteractionSetup setupInfo) -> {
                        })
                    ),
                    Map.of()
                ))
                .addTriggerGroup(
                    new TriggerGroup<>(
                        "An invocation of NoArgFunction()",
                        (InteractionSetup setupInfo) -> {
                          return parse(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                              .apply(List.of()));
                        },
                        Map.ofEntries(
                            Map.entry(
                                "returning null",
                                (String result, InteractionSetup setupInfo) -> {
                                }
                            ),
                            Map.entry("returns null", (String result, InteractionSetup setupInfo) -> {
                            })
                        ),
                        Map.of()
                    ))
                .addTriggerGroup(new TriggerGroup<>(
                    "An invocation of throwingFunction()",
                    (InteractionSetup setupInfo) -> {
                      return parse(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                          .apply(List.of()));
                    },
                    Map.of(),
                    Map.of(
                        "throwing a CustomException",
                        (Exception exception, InteractionSetup setupInfo) -> {
                          assertThat(((FunctionCompletedExceptionally) exception).getErrorClassName()).isEqualTo(
                              "CustomException");
                        }
                    )
                ))
        )
        .build()
    );

  }

  @AfterAll
  static void after() {
    contract.close();
  }
}
