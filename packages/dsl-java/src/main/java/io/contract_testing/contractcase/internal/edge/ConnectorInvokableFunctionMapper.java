package io.contract_testing.contractcase.internal.edge;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import io.contract_testing.contractcase.internal.edge.FunctionReturnTypes.FunctionFailure;
import io.contract_testing.contractcase.internal.edge.FunctionReturnTypes.FunctionSuccess;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class ConnectorInvokableFunctionMapper {


  public static abstract class ConnectorInvokableFunction<E extends Exception> {

    private final String functionName;
    private final int expectedArgumentCount;

    private final ObjectMapper mapper;

    ConnectorInvokableFunction(String functionName, int expectedArgumentCount) {
      this.functionName = functionName;
      this.expectedArgumentCount = expectedArgumentCount;
      this.mapper = new ObjectMapper();
    }


    protected abstract String invoke(List<String> args) throws JsonProcessingException, E;

    /**
     * Called by the core to invoke a user-provided function.
     *
     * @param args The arguments for the function, as strings
     * @return A ConnectorResult to indicate the result of running the function
     */
    public ConnectorResult apply(List<String> args) {
      MaintainerLog.log(
          LogLevel.MAINTAINER_DEBUG,
          "Invoking function '" + functionName + "' with args: " + args.toString()
      );

      try {
        if (args.size() == expectedArgumentCount) {
          var result = invoke(args);
          try {
            return new ConnectorSuccessWithAny(
                mapper.writeValueAsString(mapper.writeValueAsString(
                    new FunctionSuccess(result != null ? result : "null")
                ))
            );
          } catch (JsonProcessingException e) {
            return new ConnectorFailure(
                ConnectorFailureKindConstants.CASE_CORE_ERROR,
                "The registered function '" + functionName
                    + "' returned successfully (" + result
                    + "), but there was an error serialising it: "
                    + e.getMessage(),
                functionName + " (called by " + MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER + ")",
                "CORE_UNRECOVERABLE",
                ""
            );
          }
        }
        return new ConnectorFailure(
            ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
            "The registered function '" + functionName + "' accepts " + expectedArgumentCount
                + " arguments, but instead received " + args.size() + " arguments",
            MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER,
            functionName,
            ""
        );
      } catch (Exception e) {
        var userFacingStackTrace = ConnectorExceptionMapper.stackTraceToString(e);
        try {
          return new ConnectorSuccessWithAny(
              mapper.writeValueAsString(mapper.writeValueAsString(
                  new FunctionFailure(
                      e.getClass().getSimpleName(),
                      e.getMessage(),
                      userFacingStackTrace
                  )
              ))
          );
        } catch (JsonProcessingException ex) {
          return new ConnectorFailure(
              ConnectorFailureKindConstants.CASE_CORE_ERROR,
              "The registered function '" + functionName
                  + "' threw an exception, and there was an error serialising it:"
                  + e.getMessage() + "\nError thrown was: ",
              functionName + " (called by " + MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER + ")",
              "CORE_UNRECOVERABLE",
              userFacingStackTrace
          );
        }
      }
    }
  }


  public static <E extends Exception> ConnectorInvokableFunction<E> fromInvokableFunction(String functionName,
      InvokableFunction0<E> function) {
    return new ConnectorInvokableFunction<>(functionName, 0) {
      @Override
      public String invoke(List<String> args) throws E {
        return function.apply();
      }
    };
  }

  public static <E extends Exception> ConnectorInvokableFunction<E> fromInvokableFunction(String functionName,
      InvokableFunction1<E> function) {
    return new ConnectorInvokableFunction<>(functionName, 1) {
      @Override
      protected String invoke(List<String> args) throws E {
        return function.apply(args.get(0));
      }
    };
  }

  public static <E extends Exception> ConnectorInvokableFunction<E> fromInvokableFunction(String functionName,
      InvokableFunction2<E> function) {
    return new ConnectorInvokableFunction<>(functionName, 2) {
      @Override
      protected String invoke(List<String> args) throws E {
        return function.apply(
            args.get(0),
            args.get(1)
        );
      }
    };
  }

  public static <E extends Exception> ConnectorInvokableFunction<E> fromInvokableFunction(String functionName,
      InvokableFunction3<E> function) {
    return new ConnectorInvokableFunction<>(functionName, 3) {
      @Override
      protected String invoke(List<String> args) throws E {
        return function.apply(
            args.get(0),
            args.get(1),
            args.get(2)
        );
      }
    };
  }

  public static <E extends Exception> ConnectorInvokableFunction<E> fromInvokableFunction(String functionName,
      InvokableFunction4<E> function) {
    return new ConnectorInvokableFunction<>(functionName, 4) {
      @Override
      protected String invoke(List<String> args) throws E {
        return function.apply(
            args.get(0),
            args.get(1),
            args.get(2),
            args.get(3)
        );
      }
    };
  }

  public static <E extends Exception> ConnectorInvokableFunction<E> fromInvokableFunction(String functionName,
      InvokableFunction5<E> function) {
    return new ConnectorInvokableFunction<>(functionName, 5) {
      @Override
      protected String invoke(List<String> args) throws E {
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

  public static <E extends Exception> ConnectorInvokableFunction<E> fromInvokableFunction(String functionName,
      InvokableFunction6<E> function) {
    return new ConnectorInvokableFunction<>(functionName, 6) {
      @Override
      protected String invoke(List<String> args) throws E {
        return function.apply(
            args.get(0),
            args.get(1),
            args.get(2),
            args.get(3),
            args.get(4),
            args.get(5)
        );
      }
    }

        ;
  }

  public static <E extends
      Exception> ConnectorInvokableFunction<E> fromInvokableFunction(String functionName,
      InvokableFunction7<E> function
  ) {
    return new ConnectorInvokableFunction<>(functionName, 7) {
      @Override
      protected String invoke(List<String> args) throws E {
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

