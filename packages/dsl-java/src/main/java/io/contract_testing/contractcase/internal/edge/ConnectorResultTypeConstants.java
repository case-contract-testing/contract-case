package io.contract_testing.contractcase.internal.edge;

import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import org.jetbrains.annotations.NotNull;

/**
 * These copies exist because otherwise they can't be used as constants
 */
public class ConnectorResultTypeConstants {

  /**
   * This is a success type with no payload
   */
  public static final String RESULT_SUCCESS = "Success";
  /**
   * This is a success type with a map payload
   */
  public static final String RESULT_SUCCESS_HAS_MAP_PAYLOAD = "SuccessMap";
  /**
   * This is a success type with an arbitrary object payload
   */
  public static final String RESULT_SUCCESS_HAS_ANY_PAYLOAD = "SuccessAny";
  /**
   * This is a failure
   */
  public static final String RESULT_FAILURE = "Failure";


  private static void checkEqual(@NotNull String wrapper, @NotNull String boundary) {
    if (!wrapper.equals(boundary)) {
      throw new ContractCaseCoreError(
          "Mismatched result type constants - the wrapper has '" + wrapper
              + "', but the boundary expects '" + boundary
              + "'. This is a bug in the ContractCase wrapper.",
          "Java Wrapper"
      );
    }
  }
}
