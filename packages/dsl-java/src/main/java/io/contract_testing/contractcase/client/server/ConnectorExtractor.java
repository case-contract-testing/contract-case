package io.contract_testing.contractcase.client.server;

import io.contract_testing.contractcase.ContractCaseCoreError;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

class ConnectorExtractor {

  private static final String CASE_CONNECTOR_FILENAME = "case-connector.js";

  /**
   * Extracts a local copy of the contract case bundle from the jar's resources to a temporary
   * directory that will be deleted on jvm exit.
   *
   * @return The path to the extracted contract case bundle
   */
  static String extractCaseConnector() {
    final var localCopy = createTemporaryDirectory().resolve(CASE_CONNECTOR_FILENAME);

    copyResource(CASE_CONNECTOR_FILENAME, localCopy);

    localCopy.toFile().deleteOnExit();

    return localCopy.toString();

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
            "The resource input stream was null, and it's not supposed to be");
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
