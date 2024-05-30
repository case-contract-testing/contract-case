package io.contract_testing.contractcase;

import java.util.List;

class BoundaryVersionGenerator {


  List<String> getVersions() {
    var version = this.getClass()
        .getClassLoader()
        .getDefinedPackage("io.contract_testing.contractcase")
        .getImplementationVersion();
    return List.of("Java-DSL@" + (version != null ? version : "unknown"));
  }

}
