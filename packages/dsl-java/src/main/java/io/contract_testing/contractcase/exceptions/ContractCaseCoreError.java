package io.contract_testing.contractcase.exceptions;

import io.contract_testing.contractcase.internal.edge.ConnectorExceptionMapper;
import java.util.Arrays;
import java.util.stream.Collectors;
import org.jetbrains.annotations.NotNull;

/**
 * Indicates that something has gone wrong in some part of the framework (could be the wrapper, the
 * core, or the connector). Should only be used to indicate errors where it's unlikely that the user
 * can fix, and they should probably consider filing a bug.
 * <p>
 * The constructors for this class are subject to change and not considered part of the external
 * interface. They should not be relied upon outside this library.
 */
public class ContractCaseCoreError extends RuntimeException implements HasUserFacingStackTrace {

  private final String location;
  private final String userFacingStackTrace;

  /**
   * Constructs a {@code ContractCaseCoreError} with the given message. Not part of the user-facing
   * interface from this library.
   * <p>
   * For maintainers: Only use this if the Java DSL was the source of the error
   *
   * @param message Description of what went wrong.
   */
  public ContractCaseCoreError(@NotNull String message) {
    super(message);
    this.location = "Java DSL";
    this.userFacingStackTrace = "";
  }

  /**
   * Constructs a {@code ContractCaseCoreError} with the given message. Not part of the user-facing
   * interface from this library.
   *
   * @param message              Description of what went wrong.
   * @param location             the location where the error happened
   * @param userFacingStackTrace If there's a user facing stack trace, this should be it. If there
   *                             isn't, this should be an empty string
   */
  public ContractCaseCoreError(@NotNull String message,
      @NotNull String location,
      @NotNull String userFacingStackTrace) {
    super(message);
    this.location = location;
    this.userFacingStackTrace = userFacingStackTrace;
  }

  /**
   * Constructs a {@code ContractCaseCoreError} from another exception, using the same description
   * (and if it was also a {@code ContractCaseCoreError}, the location).
   * <p>
   * Only use this if you are handling an exception that is itself the core error (eg, an exception
   * deserialised from a core communication). It exists to avoid deeply nesting exceptions. Most of
   * the time, you'll want {@link ContractCaseCoreError(String, Exception)} instead.
   * <p>
   * Not part of the user-facing interface.
   *
   * @param e the error (which may be a ContractCaseCoreError).
   */
  public ContractCaseCoreError(Exception e) {
    super(e.getMessage());
    this.location = "";
    this.userFacingStackTrace = ConnectorExceptionMapper.stackTraceToString(e);
  }

  /**
   * Constructs a {@code ContractCaseCoreError} which has an underlying cause.
   * <p>
   * Not part of the user-facing interface. For maintainers: Only use this if the Java DSL is the
   * source of the error
   *
   * @param message The description of what went wrong
   * @param cause   the cause of this error
   */
  public ContractCaseCoreError(@NotNull String message, Throwable cause) {
    super(message + "(" + cause.getMessage() + ")", cause);
    this.location = "Java DSL";
    this.userFacingStackTrace = ConnectorExceptionMapper.stackTraceToString(cause);
  }

  /**
   * Gets the location where this error went wrong. Used to report errors across languages.
   *
   * @return the location (free text string)
   * @implNote Location is a concept that needs some work - in some places it is the stack trace,
   * and in others it's just a string. We should make this explicit in a future version.
   */
  public String getLocation() {
    return location;
  }

  @Override
  public String userFacingStackTrace() {
    return userFacingStackTrace;
  }
}
