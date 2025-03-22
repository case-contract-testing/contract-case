package io.contract_testing.contractcase.configuration;

import java.util.Map;
import org.jetbrains.annotations.NotNull;

public record TriggerGroup<T>(String name,
    Trigger<T> trigger,
    Map<String, TestResponseFunction<T>> testResponses,
    Map<String, TestErrorResponseFunction> testErrorResponses) {


  public TriggerGroup(
      final @NotNull String name,
      final @NotNull Trigger<T> trigger,
      final @NotNull Map<String, TestResponseFunction<T>> testResponses,
      final @NotNull Map<String, TestErrorResponseFunction> testErrorResponses) {
    this.name = name;
    this.trigger = trigger;
    this.testResponses = Map.copyOf(testResponses);
    this.testErrorResponses = Map.copyOf(testErrorResponses);
  }
}
