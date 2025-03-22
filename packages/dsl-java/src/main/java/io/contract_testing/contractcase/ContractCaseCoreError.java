package io.contract_testing.contractcase;

import io.contract_testing.contractcase.edge.ConnectorExceptionMapper;
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
public class ContractCaseCoreError extends RuntimeException {

  private final String location;

  /**
   * Constructs a {@code ContractCaseCoreError} with the given message. Not part of the user-facing
   * interface from this library.
   *
   * @param message Description of what went wrong.
   */
  public ContractCaseCoreError(@NotNull String message) {
    super(message);
    this.location = Arrays.stream(Thread.currentThread().getStackTrace())
        .map(StackTraceElement::toString)
        .collect(
            Collectors.joining("\n"));
  }

  /**
   * Constructs a {@code ContractCaseCoreError} with the given message. Not part of the user-facing
   * interface from this library.
   *
   * @param message  Description of what went wrong.
   * @param location the location where the error happened
   */
  public ContractCaseCoreError(@NotNull String message, @NotNull String location) {
    super(message);
    this.location = location;
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
    if (e instanceof ContractCaseCoreError) {
      this.location = ((ContractCaseCoreError) e).getLocation();
    } else {
      this.location = ConnectorExceptionMapper.stackTraceToString(e);
    }
  }

  /**
   * Constructs a {@code ContractCaseCoreError} which has an underlying cause.
   * <p>
   * Not part of the user-facing interface.
   *
   * @param message The description of what went wrong
   * @param cause   the cause of this error
   */
  public ContractCaseCoreError(@NotNull String message, Throwable cause) {
    super(message + "(" + cause.getMessage() + ")", cause);
    if (cause instanceof ContractCaseCoreError) {
      this.location = ((ContractCaseCoreError) cause).getLocation();
    } else {
      this.location = ConnectorExceptionMapper.stackTraceToString(cause);
    }
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
}
