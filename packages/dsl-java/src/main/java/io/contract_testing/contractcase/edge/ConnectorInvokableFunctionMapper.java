package io.contract_testing.contractcase.edge;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction0;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.LogLevel;
import io.contract_testing.contractcase.client.MaintainerLog;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class ConnectorInvokableFunctionMapper {

  static final ObjectMapper mapper = new ObjectMapper();


  public static abstract class ConnectorInvokableFunction {

    private final String functionName;
    private final int expectedArgumentCount;

    ConnectorInvokableFunction(String functionName, int expectedArgumentCount) {
      this.functionName = functionName;
      this.expectedArgumentCount = expectedArgumentCount;
    }

    protected abstract String invoke(List<String> args) throws JsonProcessingException;

    public ConnectorResult apply(List<String> args) {
      MaintainerLog.log(
          LogLevel.MAINTAINER_DEBUG,
          "Invoking function '" + functionName + "' with args: " + args.toString()
      );

      try {
        if (args.size() == expectedArgumentCount) {
          return new ConnectorSuccessWithAny(invoke(args));
        }
        return new ConnectorFailure(
            ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
            "The registered function '" + functionName + "' accepts " + expectedArgumentCount
                + " arguments, but instead received " + args.size() + " arguments",
            MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
        );
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
    }
  }


  public static <R> ConnectorInvokableFunction fromInvokableFunction(String functionName,
      InvokableFunction0<R> function) {
    return new ConnectorInvokableFunction(functionName, 0) {
      @Override
      public String invoke(List<String> args) throws JsonProcessingException {
        return mapper.writeValueAsString(function.apply());
      }
    };
  }

  public static <A, R> ConnectorInvokableFunction fromInvokableFunction(String functionName,
      InvokableFunction1<R, A> function) {
    return new ConnectorInvokableFunction(functionName, 1) {
      @Override
      protected String invoke(List<String> args) throws JsonProcessingException {
        var claz = function.getClass();
        var methods = claz.getMethods();
        var params = methods[0].getTypeParameters();
        throw new RuntimeException(Arrays.stream(params).map((t) -> t.getTypeName()).collect(
            Collectors.joining(",")));
//        return function.apply(mapper.convertValue(args.get(1),));
      }
    };
  }

}

