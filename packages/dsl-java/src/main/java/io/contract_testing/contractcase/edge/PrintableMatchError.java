package io.contract_testing.contractcase.edge;

import org.jetbrains.annotations.NotNull;

/**
 * Data class to hold data to print a message error during matching.
 */
public interface PrintableMatchError {

  /**
   * A string representation of the actual data received (may contain newlines).
   */
  @org.jetbrains.annotations.NotNull java.lang.String getActual();

  /**
   * The machine-readable type for the cause of this error, for printing after the error message to
   * make it easy to search for.
   */
  @org.jetbrains.annotations.NotNull java.lang.String getErrorTypeTag();

  /**
   * A string representation of the expected data (may contain newlines).
   */
  @org.jetbrains.annotations.NotNull java.lang.String getExpected();

  /**
   * The red highlighted blob, eg "MATCHING ERROR" or "TRIGGER FUNCTION ERROR".
   * <p>
   * Could be any string.
   */
  @org.jetbrains.annotations.NotNull java.lang.String getKind();

  /**
   * The location the error happened, for printing at the top of the error message.
   */
  @org.jetbrains.annotations.NotNull java.lang.String getLocation();

  /**
   * The tag line for the location the error happened, for printing after the error message.
   * <p>
   * This might have more information than the <code>location</code> above.
   */
  @org.jetbrains.annotations.NotNull java.lang.String getLocationTag();

  /**
   * A summary of the error.
   * <p>
   * Could be any string.
   */
  @org.jetbrains.annotations.NotNull java.lang.String getMessage();

  /**
   * @return a {@link Builder} of {@link PrintableMatchError}
   */
  static Builder builder() {
    return new Builder();
  }

  /**
   * A builder for {@link PrintableMatchError}
   */
  final class Builder implements software.amazon.jsii.Builder<PrintableMatchError> {

    java.lang.String actual;
    java.lang.String errorTypeTag;
    java.lang.String expected;
    java.lang.String kind;
    java.lang.String location;
    java.lang.String locationTag;
    java.lang.String message;

    /**
     * Sets the value of {@link PrintableMatchError#getActual}
     *
     * @param actual A string representation of the actual data received (may contain newlines).
     *               This parameter is required.
     * @return {@code this}
     */
    public Builder actual(java.lang.String actual) {
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
    public Builder errorTypeTag(java.lang.String errorTypeTag) {
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
    public Builder expected(java.lang.String expected) {
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
    public Builder kind(java.lang.String kind) {
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
    public Builder location(java.lang.String location) {
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
    public Builder locationTag(java.lang.String locationTag) {
      this.locationTag = locationTag;
      return this;
    }

    /**
     * Sets the value of {@link PrintableMatchError#getMessage}
     *
     * @param message A summary of the error. This parameter is required. Could be any string.
     * @return {@code this}
     */
    public Builder message(java.lang.String message) {
      this.message = message;
      return this;
    }

    /**
     * Builds the configured instance.
     *
     * @return a new instance of {@link PrintableMatchError}
     * @throws NullPointerException if any required attribute was not provided
     */
    @Override
    public PrintableMatchError build() {
      return new PrintableMatchErrorImpl(this);
    }
  }

  /**
   * An implementation for {@link PrintableMatchError}
   */
  final class PrintableMatchErrorImpl implements
      PrintableMatchError {

    private final java.lang.String actual;
    private final java.lang.String errorTypeTag;
    private final java.lang.String expected;
    private final java.lang.String kind;
    private final java.lang.String location;
    private final java.lang.String locationTag;
    private final java.lang.String message;


    /**
     * Constructor that initializes the object based on literal property values passed by the
     * {@link Builder}.
     */
    private PrintableMatchErrorImpl(final Builder builder) {
      this.actual = java.util.Objects.requireNonNull(builder.actual, "actual is required");
      this.errorTypeTag = java.util.Objects.requireNonNull(
          builder.errorTypeTag,
          "errorTypeTag is required"
      );
      this.expected = java.util.Objects.requireNonNull(builder.expected, "expected is required");
      this.kind = java.util.Objects.requireNonNull(builder.kind, "kind is required");
      this.location = java.util.Objects.requireNonNull(builder.location, "location is required");
      this.locationTag = java.util.Objects.requireNonNull(
          builder.locationTag,
          "locationTag is required"
      );
      this.message = java.util.Objects.requireNonNull(builder.message, "message is required");
    }

    @Override
    public java.lang.@NotNull String getActual() {
      return this.actual;
    }

    @Override
    public java.lang.@NotNull String getErrorTypeTag() {
      return this.errorTypeTag;
    }

    @Override
    public java.lang.@NotNull String getExpected() {
      return this.expected;
    }

    @Override
    public java.lang.@NotNull String getKind() {
      return this.kind;
    }

    @Override
    public java.lang.@NotNull String getLocation() {
      return this.location;
    }

    @Override
    public java.lang.@NotNull String getLocationTag() {
      return this.locationTag;
    }

    @Override
    public java.lang.@NotNull String getMessage() {
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
