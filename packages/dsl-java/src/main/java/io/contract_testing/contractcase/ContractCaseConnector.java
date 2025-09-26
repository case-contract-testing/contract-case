package io.contract_testing.contractcase;

import io.contract_testing.contractcase.internal.client.server.ContractCaseProcess;

/**
 * Utility class that allows configuration of the core connector
 */
public class ContractCaseConnector {


  /**
   * Sets the path to NodeJs to be used by the connector. Most users won't need to use this, but
   * it's useful if you have node in a non-standard location (eg in CI).
   *
   * @param pathToNode Path to the nodejs executable.
   */
  public static void setNodeJsPath(String pathToNode) {
    ContractCaseProcess.getInstance().setNodeJsPath(pathToNode);
  }
}
