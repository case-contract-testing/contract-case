package io.contract_testing.contractcase;

import java.util.List;

/**
 * Determines the version of this package, for use in debug logs
 */
class BoundaryVersionGenerator {

  /**
   * Get the list of versions used in each package. Now only returns one entry, since all versions
   * are locked.
   *
   * @return list of versions
   */
  List<String> getVersions() {
    var version = this.getClass()
        .getClassLoader()
        .getDefinedPackage("io.contract_testing.contractcase")
        .getImplementationVersion();
    return List.of("Java-DSL@" + (version != null ? version : "unknown"));
  }

}
