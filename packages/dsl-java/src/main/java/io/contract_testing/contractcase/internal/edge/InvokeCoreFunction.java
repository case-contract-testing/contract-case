package io.contract_testing.contractcase.internal.edge;

import java.util.List;

public interface InvokeCoreFunction {
  ConnectorResult invoke(List<String> args);
}
