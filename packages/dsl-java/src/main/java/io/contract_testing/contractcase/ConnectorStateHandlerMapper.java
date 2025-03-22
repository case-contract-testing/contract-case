package io.contract_testing.contractcase;

import io.contract_testing.contractcase.configuration.StateHandler;
import io.contract_testing.contractcase.internal.edge.ConnectorExceptionMapper;
import io.contract_testing.contractcase.internal.edge.ConnectorResult;
import io.contract_testing.contractcase.internal.edge.ConnectorStateHandler;
import io.contract_testing.contractcase.internal.edge.ConnectorSuccess;
import io.contract_testing.contractcase.internal.edge.ConnectorSuccessWithMap;
import java.util.HashMap;
import java.util.Map;
import org.jetbrains.annotations.NotNull;

class ConnectorStateHandlerMapper {

  public static Map<String, ConnectorStateHandler> map(
      Map<String, StateHandler> stateHandlers) {
    var ret = new HashMap<String, ConnectorStateHandler>();

    stateHandlers.forEach((key, value) -> ret.put(key, map(value)));

    return ret;
  }

  private static ConnectorStateHandler map(StateHandler handler) {

    return new ConnectorStateHandler() {

      @Override
      public @NotNull ConnectorResult setup() {
        try {
          var config = handler.setup();
          if (config == null) {
            return new ConnectorSuccess();
          }
          return new ConnectorSuccessWithMap(config);
        } catch (Exception e) {
          return ConnectorExceptionMapper.mapAsStateFailure(e);
        }
      }

      @Override
      public @NotNull ConnectorResult teardown() {
        try {
          handler.teardown();

          return new ConnectorSuccess();
        } catch (Exception e) {
          return ConnectorExceptionMapper.mapAsStateFailure(e);
        }
      }
    };
  }
}
