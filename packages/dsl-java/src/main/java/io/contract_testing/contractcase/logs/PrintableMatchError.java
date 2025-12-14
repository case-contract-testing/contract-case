package io.contract_testing.contractcase.logs;

import java.util.Objects;
import org.jetbrains.annotations.NotNull;

/**
 * Data class to hold data to print a message error during matching.
 */
public interface PrintableMatchError {

  /**
   * A string representation of the actual data received (may contain newlines).
   */
  @NotNull String getActual();

  /**
   * The machine-readable type for the cause of this error, for printing after the error message to
   * make it easy to search for.
   */
  @NotNull String getErrorTypeTag();

  /**
   * A string representation of the expected data (may contain newlines).
   */
  @NotNull String getExpected();

  /**
   * The red highlighted blob, eg "MATCHING ERROR" or "TRIGGER FUNCTION ERROR".
   * <p>
   * Could be any string.
   */
  @NotNull String getKind();

  /**
   * The location the error happened, for printing at the top of the error message.
   */
  @NotNull String getLocation();

  /**
   * The tag line for the location the error happened, for printing after the error message.
   * <p>
   * This might have more information than the <code>location</code> above.
   */
  @NotNull String getLocationTag();

  /**
   * A summary of the error.
   * <p>
   * Could be any string.
   */
  @NotNull String getMessage();

  /**
   * @return a {@link Builder} of {@link PrintableMatchError}
   */
  static Builder builder() {
    return new Builder();
  }

  /**
   * A builder for {@link PrintableMatchError}
   */
  final class Builder {

    String actual;
    String errorTypeTag;
    String expected;
    String kind;
    String location;
    String locationTag;
    String message;

    /**
     * Sets the value of {@link PrintableMatchError#getActual}
     *
     * @param actual A string representation of the actual data received (may contain newlines).
     *               This parameter is required.
     * @return {@code this}
     */
    public Builder actual(String actual) {
      this.actual = actual;
      return this;
    }

    /**
     * Sets the value of {@link PrintableMatchError#getErrorTypeTag}
     *
     * @param errorTypeTag The machine-readable type for the cause of this error, for printing after
     *                     the error message to make it easy to search for. This parameter is
     *                     required.
     * @return {@code this}
     */
    public Builder errorTypeTag(String errorTypeTag) {
      this.errorTypeTag = errorTypeTag;
      return this;
    }

    /**
     * Sets the value of {@link PrintableMatchError#getExpected}
     *
     * @param expected A string representation of the expected data (may contain newlines). This
     *                 parameter is required.
     * @return {@code this}
     */
    public Builder expected(String expected) {
      this.expected = expected;
      return this;
    }

    /**
     * Sets the value of {@link PrintableMatchError#getKind}
     *
     * @param kind The red highlighted blob, eg "MATCHING ERROR" or "TRIGGER FUNCTION ERROR". This
     *             parameter is required. Could be any string.
     * @return {@code this}
     */
    public Builder kind(String kind) {
      this.kind = kind;
      return this;
    }

    /**
     * Sets the value of {@link PrintableMatchError#getLocation}
     *
     * @param location The location the error happened, for printing at the top of the error
     *                 message. This parameter is required.
     * @return {@code this}
     */
    public Builder location(String location) {
      this.location = location;
      return this;
    }

    /**
     * Sets the value of {@link PrintableMatchError#getLocationTag}
     *
     * @param locationTag The tag line for the location the error happened, for printing after the
     *                    error message. This parameter is required. This might have more
     *                    information than the <code>location</code> above.
     * @return {@code this}
     */
    public Builder locationTag(String locationTag) {
      this.locationTag = locationTag;
      return this;
    }

    /**
     * Sets the value of {@link PrintableMatchError#getMessage}
     *
     * @param message A summary of the error. This parameter is required. Could be any string.
     * @return {@code this}
     */
    public Builder message(String message) {
      this.message = message;
      return this;
    }

    /**
     * Builds the configured instance.
     *
     * @return a new instance of {@link PrintableMatchError}
     * @throws NullPointerException if any required attribute was not provided
     */
    public PrintableMatchError build() {
      return new PrintableMatchErrorImpl(this);
    }
  }

  /**
   * An implementation for {@link PrintableMatchError}
   */
  final class PrintableMatchErrorImpl implements
      PrintableMatchError {

    private final String actual;
    private final String errorTypeTag;
    private final String expected;
    private final String kind;
    private final String location;
    private final String locationTag;
    private final String message;


    /**
     * Constructor that initializes the object based on literal property values passed by the
     * {@link Builder}.
     */
    private PrintableMatchErrorImpl(final Builder builder) {
      this.actual = Objects.requireNonNull(builder.actual, "actual is required");
      this.errorTypeTag = Objects.requireNonNull(
          builder.errorTypeTag,
          "errorTypeTag is required"
      );
      this.expected = Objects.requireNonNull(builder.expected, "expected is required");
      this.kind = Objects.requireNonNull(builder.kind, "kind is required");
      this.location = Objects.requireNonNull(builder.location, "location is required");
      this.locationTag = Objects.requireNonNull(
          builder.locationTag,
          "locationTag is required"
      );
      this.message = Objects.requireNonNull(builder.message, "message is required");
    }

    @Override
    public @NotNull String getActual() {
      return this.actual;
    }

    @Override
    public @NotNull String getErrorTypeTag() {
      return this.errorTypeTag;
    }

    @Override
    public @NotNull String getExpected() {
      return this.expected;
    }

    @Override
    public @NotNull String getKind() {
      return this.kind;
    }

    @Override
    public @NotNull String getLocation() {
      return this.location;
    }

    @Override
    public @NotNull String getLocationTag() {
      return this.locationTag;
    }

    @Override
    public @NotNull String getMessage() {
      return this.message;
    }

    @Override
    public boolean equals(final Object o) {
      if (this == o) {
        return true;
      }
      if (o == null || getClass() != o.getClass()) {
        return false;
      }

      PrintableMatchErrorImpl that = (PrintableMatchErrorImpl) o;

      if (!actual.equals(that.actual)) {
        return false;
      }
      if (!errorTypeTag.equals(that.errorTypeTag)) {
        return false;
      }
      if (!expected.equals(that.expected)) {
        return false;
      }
      if (!kind.equals(that.kind)) {
        return false;
      }
      if (!location.equals(that.location)) {
        return false;
      }
      if (!locationTag.equals(that.locationTag)) {
        return false;
      }
      return this.message.equals(that.message);
    }

    @Override
    public int hashCode() {
      int result = this.actual.hashCode();
      result = 31 * result + (this.errorTypeTag.hashCode());
      result = 31 * result + (this.expected.hashCode());
      result = 31 * result + (this.kind.hashCode());
      result = 31 * result + (this.location.hashCode());
      result = 31 * result + (this.locationTag.hashCode());
      result = 31 * result + (this.message.hashCode());
      return result;
    }
  }
}
