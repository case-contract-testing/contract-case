package io.contract_testing.contractcase.internal.edge;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction0;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction2;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction3;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction4;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction5;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction6;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction7;
import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.internal.client.MaintainerLog;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class ConnectorInvokableFunctionMapper {


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
          var result = invoke(args);
          return new ConnectorSuccessWithAny(result != null ? result : "null");
        }
        return new ConnectorFailure(
            ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
            "The registered function '" + functionName + "' accepts " + expectedArgumentCount
                + " arguments, but instead received " + args.size() + " arguments",
            MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER,
            functionName
        );
      } catch (Exception e) {
        var stackTraceFirstLines = Arrays.stream(e.getStackTrace())
            .limit(4)
            .map(StackTraceElement::toString).collect(Collectors.joining("\n"));
        return new ConnectorFailure(
            ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
            "The function '" + functionName + "' threw an exception: "
                + e.getMessage() + "\n" + stackTraceFirstLines,
            MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER,
            "UNDOCUMENTED"
        );
      }
    }
  }


  public static ConnectorInvokableFunction fromInvokableFunction(String functionName,
      InvokableFunction0 function) {
    return new ConnectorInvokableFunction(functionName, 0) {
      @Override
      public String invoke(List<String> args) throws JsonProcessingException {
        return function.apply();
      }
    };
  }

  public static ConnectorInvokableFunction fromInvokableFunction(String functionName,
      InvokableFunction1 function) {
    return new ConnectorInvokableFunction(functionName, 1) {
      @Override
      protected String invoke(List<String> args) {
        return function.apply(args.get(0));
      }
    };
  }

  public static ConnectorInvokableFunction fromInvokableFunction(String functionName,
      InvokableFunction2 function) {
    return new ConnectorInvokableFunction(functionName,2 ) {
      @Override
      protected String invoke(List<String> args) {
        return function.apply(
            args.get(0),
            args.get(1)
        );
      }
    };
  }

  public static ConnectorInvokableFunction fromInvokableFunction(String functionName,
      InvokableFunction3 function) {
    return new ConnectorInvokableFunction(functionName, 3) {
      @Override
      protected String invoke(List<String> args) {
        return function.apply(
            args.get(0),
            args.get(1),
            args.get(2)
        );
      }
    };
  }

  public static ConnectorInvokableFunction fromInvokableFunction(String functionName,
      InvokableFunction4 function) {
    return new ConnectorInvokableFunction(functionName, 4) {
      @Override
      protected String invoke(List<String> args) {
        return function.apply(
            args.get(0),
            args.get(1),
            args.get(2),
            args.get(3)
        );
      }
    };
  }

  public static ConnectorInvokableFunction fromInvokableFunction(String functionName,
      InvokableFunction5 function) {
    return new ConnectorInvokableFunction(functionName, 5) {
      @Override
      protected String invoke(List<String> args) {
        return function.apply(
            args.get(0),
            args.get(1),
            args.get(2),
            args.get(3),
            args.get(4)
        );
      }
    };
  }

  public static ConnectorInvokableFunction fromInvokableFunction(String functionName,
      InvokableFunction6 function) {
    return new ConnectorInvokableFunction(functionName, 6) {
      @Override
      protected String invoke(List<String> args) {
        return function.apply(
            args.get(0),
            args.get(1),
            args.get(2),
            args.get(3),
            args.get(4),
            args.get(5)
        );
      }
    };
  }

  public static ConnectorInvokableFunction fromInvokableFunction(String functionName,
      InvokableFunction7 function) {
    return new ConnectorInvokableFunction(functionName, 7) {
      @Override
      protected String invoke(List<String> args) {
        return function.apply(
            args.get(0),
            args.get(1),
            args.get(2),
            args.get(3),
            args.get(4),
            args.get(5),
            args.get(6)
        );
      }
    };
  }

}

