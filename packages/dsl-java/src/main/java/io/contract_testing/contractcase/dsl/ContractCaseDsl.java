package io.contract_testing.contractcase.dsl;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * Marker interface to mark generated DSL classes as belonging to ContractCase.
 * <p>
 * Any custom serialisers can use this to detect the ContractCase DSL if needed.
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface ContractCaseDsl {

}
