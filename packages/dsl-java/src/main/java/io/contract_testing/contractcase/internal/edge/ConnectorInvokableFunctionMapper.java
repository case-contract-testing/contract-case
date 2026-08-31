package io.contract_testing.contractcase.internal.edge;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
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

  /**
   * Jackson mixin that strips the standard Throwable properties when serialising a thrown
   * exception into the error internals, so that only the user-defined properties of the exception
   * are included. Users can further control the serialisation with Jackson annotations on their
   * exception class.
   */
  @JsonIgnoreProperties({"stackTrace", "cause", "suppressed", "localizedMessage", "message"})
  private abstract static class ThrowableMixin {

  }

  /**
   * Creates the ObjectMapper used to serialise thrown exceptions into the error internals
   *
   * @return a configured ObjectMapper
   */
  static ObjectMapper errorInternalsMapper() {
    return new ObjectMapper()
        .addMixIn(Throwable.class, ThrowableMixin.class)
        .disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
  }


  public static abstract class ConnectorInvokableFunction<E extends Exception> {

    private final String functionName;
    private final int expectedArgumentCount;

    private final ObjectMapper mapper;
    private final ObjectMapper errorInternalsMapper;

    ConnectorInvokableFunction(String functionName, int expectedArgumentCount) {
      this.functionName = functionName;
      this.expectedArgumentCount = expectedArgumentCount;
      this.mapper = new ObjectMapper();
      this.errorInternalsMapper = errorInternalsMapper();
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
                      userFacingStackTrace,
                      errorInternalsMapper.valueToTree(e)
                  )
              ))
          );
        } catch (JsonProcessingException | IllegalArgumentException ex) {
          return new ConnectorFailure(
              ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
              "The registered function '" + functionName
                  + "' threw an exception (" + e.getClass().getSimpleName()
                  + "), but there was an error serialising it: " + ex.getMessage()
                  + "\nIf the exception contains properties that can't be serialised by Jackson, "
                  + "you can exclude them with Jackson annotations (eg @JsonIgnore) on the exception class.",
              functionName + " (called by " + MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER + ")",
              "UNDOCUMENTED",
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

