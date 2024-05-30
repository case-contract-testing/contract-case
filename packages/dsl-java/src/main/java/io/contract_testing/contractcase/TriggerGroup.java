package io.contract_testing.contractcase;

import io.contract_testing.contractcase.edge.ITriggerFunction;
import java.util.HashMap;
import java.util.Map;
import org.jetbrains.annotations.NotNull;

public class TriggerGroup<T> {

  private final String name;
  private final Trigger<T> trigger;
  private final Map<String, TestResponseFunction<T>> testResponses;
  private final Map<String, TestErrorResponseFunction> testErrorResponses;

  public String getName() {
    return this.name;
  }


  public TriggerGroup(
      final @NotNull String name,
      final @NotNull Trigger<T> trigger,
      final @NotNull Map<String, TestResponseFunction<T>> testResponses,
      final @NotNull Map<String, TestErrorResponseFunction> testErrorResponses) {
    this.name = name;
    this.trigger = trigger;
    this.testResponses = testResponses;
    this.testErrorResponses = testErrorResponses;
  }

  Map<String, ITriggerFunction> toMap() {
    var ret = new HashMap<String, ITriggerFunction>();

    testResponses.forEach((key, testResponseFunction) -> {
      ret.put(this.name + "::" + key, BoundaryTriggerMapper.map(trigger, testResponseFunction));
    });

    testErrorResponses.forEach((key, testErrorResponseFunction) -> {
      ret.put(
          this.name + "::" + key,
          BoundaryTriggerMapper.map(trigger, testErrorResponseFunction)
      );
    });

    return ret;
  }
}
