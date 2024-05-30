package io.contract_testing.contractcase;

import org.jetbrains.annotations.NotNull;

public interface Trigger<T> {

  T call(final @NotNull SetupInfo setupInfo);
}
