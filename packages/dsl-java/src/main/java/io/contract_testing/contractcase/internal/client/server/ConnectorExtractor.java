package io.contract_testing.contractcase.internal.client.server;

import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

class ConnectorExtractor {

  private static final String CASE_CONNECTOR_FILENAME = "case-connector.js";
  private static final String CASE_CONNECTOR_SOURCEMAP = "case-connector.js.map";

  /**
   * Extracts a local copy of the contract case bundle from the jar's resources to a temporary
   * directory that will be deleted on jvm exit.
   *
   * @return The path to the extracted contract case bundle
   */
  static String extractCaseConnector() {
    final var dir = createTemporaryDirectory();
    final var localConnectorJs = dir.resolve(CASE_CONNECTOR_FILENAME);
    final var localConnectorSourceMap = dir.resolve(CASE_CONNECTOR_SOURCEMAP);

    copyResource(CASE_CONNECTOR_FILENAME, localConnectorJs);
    copyResource(CASE_CONNECTOR_SOURCEMAP, localConnectorSourceMap);

    localConnectorJs.toFile().deleteOnExit();
    localConnectorSourceMap.toFile().deleteOnExit();

    return localConnectorJs.toString();

  }

  private static Path createTemporaryDirectory() {
    try {
      final var directory = Files.createTempDirectory("contract-case-connector");

      directory.toFile().deleteOnExit();

      return directory;
    } catch (IOException e) {
      throw new ContractCaseCoreError(
          "Unable to create temporary directory for ContractCase Connector executable",
          e
      );
    }
  }

  private static void copyResource(final String resourceName, final Path target) {
    try (InputStream inputStream = ConnectorExtractor.class.getResourceAsStream(resourceName)) {
      if (inputStream == null) {
        throw new ContractCaseCoreError(
            "The resource input stream for '" + resourceName
                + "' was null, and it's not supposed to be. This is an internal problem in ContractCase,"
                + " probably this is caused by a bad refactor or classpath issue.");
      }
      Files.copy(inputStream, target);
    } catch (IOException e) {
      throw new ContractCaseCoreError(
          "Unable to extract ContractCase Connector executable",
          e
      );
    }
  }

}
