package io.contract_testing.contractcase.edge;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction0;
import io.contract_testing.contractcase.LogLevel;
import io.contract_testing.contractcase.client.MaintainerLog;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class ConnectorInvokableFunctionMapper {

  static final ObjectMapper mapper = new ObjectMapper();

  @FunctionalInterface
  public interface ConnectorInvokableFunction {

    ConnectorResult apply(List<String> args);
  }


  public static <R> ConnectorInvokableFunction fromInvokableFunction(String functionName,
      InvokableFunction0<R> function) {
    return new ConnectorInvokableFunction() {
      @Override
      public ConnectorResult apply(List<String> args) {
        MaintainerLog.log(
            LogLevel.MAINTAINER_DEBUG,
            "Invoking function '" + functionName + "' with args: " + args.toString()
        );
        try {
          if (args.size() == 0) {
            return new ConnectorSuccessWithAny(mapper.writeValueAsString(function.apply()));
          }

        } catch (JsonProcessingException e) {
          return new ConnectorFailure(
              ConnectorFailureKindConstants.CASE_CORE_ERROR,
              "Unable to serialise the return value of '" + functionName + "'. The error was:"
                  + e.getMessage(),
              MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
          );
        } catch (Exception e) {
          var stackTraceFirstLines = Arrays.stream(e.getStackTrace())
              .limit(4)
              .map(StackTraceElement::toString).collect(Collectors.joining("\n"));
          return new ConnectorFailure(

              ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
              "Exception while invoking '" + functionName + "': "
                  + e.getMessage() + "\n" + stackTraceFirstLines,
              MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
          );
        }

        return null;
      }
    };
  }
}

