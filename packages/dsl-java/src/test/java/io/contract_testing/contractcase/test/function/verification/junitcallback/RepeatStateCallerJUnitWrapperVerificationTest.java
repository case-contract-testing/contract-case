package io.contract_testing.contractcase.test.function.verification.junitcallback;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractVerifier;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.configuration.StateHandler;
import io.contract_testing.contractcase.internal.ConnectorResultMapper;
import io.contract_testing.contractcase.internal.client.MaintainerLog;
import io.contract_testing.contractcase.internal.edge.BoundaryCrashReporter;
import io.contract_testing.contractcase.internal.edge.ConnectorExceptionMapper;
import io.contract_testing.contractcase.internal.edge.ConnectorFailure;
import io.contract_testing.contractcase.internal.edge.ConnectorFailureKindConstants;
import io.contract_testing.contractcase.internal.edge.ConnectorResult;
import io.contract_testing.contractcase.internal.edge.ConnectorResultTypeConstants;
import io.contract_testing.contractcase.internal.edge.InvokeCoreTest;
import io.contract_testing.contractcase.internal.edge.RunTestCallback;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Spliterator;
import java.util.Spliterators;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;

@TestInstance(Lifecycle.PER_CLASS)
public class RepeatStateCallerJUnitWrapperVerificationTest {

  static final ObjectMapper mapper = new ObjectMapper();

  private static final JUnitTestRunCallback callback = new JUnitTestRunCallback();
  private static final ContractVerifier contract = new ContractVerifier(
      ContractCaseConfigBuilder.aContractCaseConfig()
          .consumerName("Java Repeated State Caller Example")
          .providerName("Java Repeated State Implementer Example")
          .publish(PublishType.NEVER)
          //.logLevel(LogLevel.DEEP_MAINTAINER_DEBUG)
          .build(),
      callback
  );

  Integer value = 0;

  @BeforeEach
  public void zero() {
    value = 0;
  }


  @AfterAll
  static void after() {
    contract.close();
  }

  // @TestFactory
  public Stream<DynamicTest> verification() {
    contract.registerFunction("getValue", () -> {
      return "" + value;
    });
    var executor = Executors.newSingleThreadExecutor();
    executor.submit(() -> {
      try {
        ContractCaseConfigBuilder builder= ContractCaseConfigBuilder.aContractCaseConfig()
            //  .logLevel(LogLevel.MAINTAINER_DEBUG)
            .printResults(true)
            .throwOnFail(true);

        for(int i =0 ; i < 23; i++) {
          final int finValue = i;
          builder.stateHandler("The value is " + i, StateHandler.setupFunction(() -> {
            value = finValue;
          }));
        }

        contract.runVerification(builder.build());
      } finally {
      //  callback.close();
      }
    });
    return callback.getStream();
  }


  private static class JUnitTestRunCallback implements RunTestCallback {

    private final List<ConnectorFailure> failures = new ArrayList<>();

    private final BlockingQueue<Optional<DynamicTest>> queue = new LinkedBlockingQueue<>();
    private DynamicTestIterator iterator;

    @Override
    public @NotNull ConnectorResult runTest(@NotNull String testName,
        @NotNull InvokeCoreTest invoker) {
      // These are called on a different thread from the main test thread,
      // So we can safely delegate the completion of the test to this future
      CompletableFuture<ConnectorResult> resultFuture = new CompletableFuture<>();
      try {
        queue.put(
            Optional.of(
                DynamicTest.dynamicTest(sanitiseForJunit(testName), () -> {
                  // Here we actually complete the test
                  completeTest(resultFuture, testName, invoker);
                  // This will throw if there was an exception running this test
                  ConnectorResultMapper.mapVoid(resultFuture.get());
                })
            )
        );
        if(":::CASE_END_ALL_VERIFICATION:::".equals(testName)) {
          this.close();
        }

        return resultFuture.get();
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        return ConnectorExceptionMapper.map(e);
      } catch (ExecutionException e) {
        return ConnectorExceptionMapper.map(e);
      }
    }

    /**
     * Closes the test runner, finalising the stream
     */
    public void close() {
      try {
        queue.put(Optional.empty());
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
      }
    }

    public Stream<DynamicTest> getStream() {
      iterator = new DynamicTestIterator();
      return StreamSupport.stream(Spliterators.spliteratorUnknownSize(iterator, Spliterator.ORDERED & Spliterator.IMMUTABLE), false);
    }

    private synchronized void completeTest(
        @NotNull CompletableFuture<ConnectorResult> resultFuture,
        @NotNull String testName,
        @NotNull InvokeCoreTest invoker) {
      try {
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Invoking verifier for: " + testName);
        var result = invoker.verify();
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Verifier returned for: " + testName);
        // TODO: Replace this with something that knows what to do with these results
        if (result.getResultType().equals(ConnectorResultTypeConstants.RESULT_SUCCESS)) {
          MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
          MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "[SUCCESS] " + testName);
          MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");

        } else {
          var failure = ((ConnectorFailure) result);
          failures.add(failure);
          var kind = failure.getKind();
          if (kind.equals(ConnectorFailureKindConstants.CASE_CORE_ERROR)) {
            BoundaryCrashReporter.printFailure(failure);
          } else if (kind.equals(ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR)) {
            MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
            MaintainerLog.log(
                LogLevel.MAINTAINER_DEBUG,
                "[CONFIGURATION ERROR] " + failure.getMessage()
            );
            MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
          } else {
            MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
            MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "[OTHER ERROR] " + failure.getMessage());
            MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
          }
        }
        resultFuture.complete(result);
      } catch (Exception e) {
        try {
          resultFuture.complete(ConnectorExceptionMapper.map(e));
        } catch (Exception ohNo) {
          resultFuture.complete(new ConnectorFailure(
              ConnectorFailureKindConstants.CASE_CORE_ERROR,
              "Couldn't complete test future: " + e.getMessage() + "\n While processing:"
                  + e.getMessage(),
              "java connector",
              "UNDOCUMENTED",
              ConnectorExceptionMapper.stackTraceToString(ohNo)
          ));
        }
      }
    }

    private String sanitiseForJunit(String testName) {
      return testName;
    }

    @Override
    public @NotNull List<ConnectorFailure> getFailures() {
      return List.copyOf(this.failures);
    }


    private class DynamicTestIterator implements Iterator<DynamicTest> {

      private Optional<DynamicTest> optionalNext = getNext();

      @Override
      public boolean hasNext() {
        return optionalNext.isPresent();
      }

      @Override
      public DynamicTest next() {
        var current = optionalNext;
        optionalNext = getNext();
        return current.orElseThrow(() -> new NoSuchElementException(
            "Asked for more tests, when there weren't any"));
      }

      /**
       * Blocks until we have a next value. If the optional returned is empty,
       * it's the end of the stream
       *
       * @return An optional containing the next value out of the queue, or empty if there are no more values
       */
      private Optional<DynamicTest> getNext() {
        try {
          return queue.take();
        } catch (InterruptedException e) {
          Thread.currentThread().interrupt();
          return Optional.empty();
        }
      }
    }
  }
}