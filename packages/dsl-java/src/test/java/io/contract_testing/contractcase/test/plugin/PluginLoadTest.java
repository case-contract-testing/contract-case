package io.contract_testing.contractcase.test.plugin;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.dsl.interactions.functions.WillCallFunction;
import io.contract_testing.contractcase.dsl.states.InState;
import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

/**
 * Tests loading a third-party plugin by package name.
 *
 * The fixture plugin is installed in this project's node_modules (it's a
 * devDependency of this package - see
 * case-connector/test-fixtures/contract-case-test-plugin). Loading it by name
 * proves that the connector resolves plugin packages from the project the
 * tests run from, even though the connector itself runs from a temporary
 * directory.
 */
public class PluginLoadTest {

  private static ContractDefiner contract;

  @BeforeAll
  static void before() {
    contract = new ContractDefiner(
        ContractCaseConfigBuilder.aContractCaseConfig()
            .consumerName("Java Plugin Fixture Consumer")
            .providerName("Java Plugin Fixture Provider")
            .publish(PublishType.NEVER)
            //  .changedContracts(ChangedContractsBehaviour.OVERWRITE)
            .adviceOverrides(Map.of(
                "OVERWRITE_CONTRACTS_NEEDED",
                "Please re-run this test, but:\nFirst uncomment the changedContracts line in this unit test"))
            .build());
    contract.loadPlugins("@contract-case/test-plugin-fixture");
  }

  @AfterAll
  static void after() {
    contract.endRecord();
  }

  @Test
  public void testInteractionWithPluginProvidedMatcher() {
    // The fixture plugin's matcher accepts any actual value, and strips to
    // the example 'stripped-by-default-export'
    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(new InState("The plugin fixture is loaded")),
            WillCallFunction.builder()
                .arguments(List.of())
                .returnValue(Map.of(
                    "_case:matcher:type",
                    "test-fixture:default-export:Matcher"))
                .functionName("ReturnsPluginMatchedValue")
                .build()),
        IndividualSuccessTestConfigBuilder.<String>builder()
            .withTrigger((setupInfo) -> parse(setupInfo.getFunction(setupInfo.getMockSetup(
                    "functionHandle"))
                .apply(List.of())))
            .withTestResponse((result, setupInfo) -> {
              assertThat(result).isEqualTo("stripped-by-default-export");
            }));
  }

  @Test
  public void testLoadingAPluginThatIsNotInstalledFails() {
    var exception = assertThrows(
        ContractCaseConfigurationError.class,
        () -> contract.loadPlugins("definitely-not-an-installed-plugin"));
    assertThat(exception.getMessage()).contains("definitely-not-an-installed-plugin");
  }

  private String parse(String json) {
    try {
      return new ObjectMapper().readValue(json, String.class);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }
}
