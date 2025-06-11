export const ErrorCodes = {
  configuration: {
    /**
     * Used for when a file access problem happened trying to write a contract file.
     * This usually means ContractCase has been given a bad path, is out of disk
     * space, or some other I/O error has occurred.
     *
     * The error message should have additional information here.
     */
    DISK_IO_PROBLEM: 'DISK_IO_PROBLEM',

    /**
     * Used when an interaction definition isn't valid.
     *
     * Because interaction definitions are very flexible,
     * it's sometimes possible to pass the wrong matcher at an inappropriate
     * time. For example, it could be possible to specify that an http response
     * code must be a complex object - which should never be possible.
     *
     * If you're getting this code, it means that the matching engine has
     * discovered that the expectations in your interaction aren't valid.
     *
     * Although the type system tries to prevent invalid interaction
     * definitions, this isn't always possible in all target languages, so
     * ContractCase's default plugins try to detect this and fail with a helpful
     * error message.
     *
     * Usually this means you'll need to update your interaction definition. The
     * error message should have more information.
     *
     */
    BAD_INTERACTION_DEFINITION: 'BAD_INTERACTION_DEFINITION',
    /**
     * Used for when a configuration value is outside its normal range. The error message alongside this code should
     * tell you what specifically went wrong.
     *
     * In most cases this class of error is prevented with the type system.
     */
    INVALID_CONFIG: 'INVALID_CONFIG' as const,

    /**
     * A lifecycle method was called out of order.
     *
     * Check that your code has the method calls in the right order.
     *
     * Although care has been taken to prevent invalid lifecycle calls from
     * being possible, there are still some cases where this can happen.
     *
     * For contract definition, it should be:
     *
     * 1. Begin definition
     * 2. Multiple calls to runInteraction or your language's equivalent of
     *    runRejectingInteraction
     * 3. End record (writing the contract).
     *
     * Check that you're not accidentally reusing test instances between runs.
     *
     */
    INVALID_LIFECYCLE: 'INVALID_LIFECYCLE' as const,

    /**
     * The current interaction was configured to have a particular state setup
     * handler, but it was missing.
     *
     * State handlers are functions that you define to set up a particular state
     * within your code (for example, an interaction on an HTTP provider might
     * have a state named `'User with id 123 exists'`).
     *
     * This error indicates that Contractcase was expecting a named state handler,
     * but it couldn't find it.
     *
     * This usually indicates a misconfiguration - check that you have provided
     * a state handler with the exact name of the handler that was missing in
     * the configuration of your test.
     *
     * If you need help investigating this error, you can set the configuration
     * property `logLevel` to `'DEBUG'` to see a list of the configured state
     * handlers.
     *
     */
    MISSING_STATE_HANDLER: 'MISSING_STATE_HANDLER' as const,
    /**
     * Tried to publish verification results for a contract that doesn't have
     * information on where to publish the verification results.
     *
     * This can happen if you're sharing contracts locally, but still have
     * publishing verification results enabled.
     */
    NON_BROKERED_CONTRACT: 'NON_BROKERED_CONTRACT' as const,
    /**
     * The existing contract didn't match the new contract being written.
     *
     * This is an error when ContractCase is running in validate snapshot mode,
     * where defined contracts are checked against the contract on disk, and
     * a failure happens if the new contract is different.
     *
     * To address this, you'll need to run contract definitions with
     * a changedContracts behaviour set to overwrite the contract instead of check.
     *
     *  Please re-run your tests with one of:
     *
     *   * The configuration property changedContracts is set to 'OVERWRITE'
     *   * The environment variable CASE_changedContracts=OVERWRITE
     *
     *   If you see this on consecutive runs, please check
     *   that your contract doesn't contain randomness
     *   during contract definition
     */
    OVERWRITE_CONTRACTS_NEEDED: 'OVERWRITE_CONTRACTS_NEEDED' as const,
    /**
     * Used when there is no additional documentation for this error code.
     *
     * Long term, there should be none of these.
     */
    UNDOCUMENTED: 'UNDOCUMENTED' as const,
  } as const,
} as const;

export type ConfigurationErrorCode = keyof (typeof ErrorCodes)['configuration'];
