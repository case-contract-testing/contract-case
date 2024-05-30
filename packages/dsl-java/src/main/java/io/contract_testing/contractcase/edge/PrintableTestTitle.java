package io.contract_testing.contractcase.edge;

import org.jetbrains.annotations.NotNull;

/**
 * Data class to hold data for a test title print line.
 */
public interface PrintableTestTitle extends software.amazon.jsii.JsiiSerializable {

  /**
   * Any additional text to print after the title (may include newlines).
   */
  @org.jetbrains.annotations.NotNull java.lang.String getAdditionalText();

  /**
   * An icon for the start of the line (usually a single character emoji, but could be any string).
   */
  @org.jetbrains.annotations.NotNull java.lang.String getIcon();

  /**
   * Either 'success' to indicate success, or 'failure' to indicate failure.
   */
  @org.jetbrains.annotations.NotNull java.lang.String getKind();

  /**
   * The title to print (will not include newlines).
   */
  @org.jetbrains.annotations.NotNull java.lang.String getTitle();

  /**
   * @return a {@link Builder} of {@link PrintableTestTitle}
   */
  static Builder builder() {
    return new Builder();
  }

  /**
   * A builder for {@link PrintableTestTitle}
   */
  final class Builder implements software.amazon.jsii.Builder<PrintableTestTitle> {

    java.lang.String additionalText;
    java.lang.String icon;
    java.lang.String kind;
    java.lang.String title;

    /**
     * Sets the value of {@link PrintableTestTitle#getAdditionalText}
     *
     * @param additionalText Any additional text to print after the title (may include newlines).
     *                       This parameter is required.
     * @return {@code this}
     */
    public Builder additionalText(java.lang.String additionalText) {
      this.additionalText = additionalText;
      return this;
    }

    /**
     * Sets the value of {@link PrintableTestTitle#getIcon}
     *
     * @param icon An icon for the start of the line (usually a single character emoji, but could be
     *             any string). This parameter is required.
     * @return {@code this}
     */
    public Builder icon(java.lang.String icon) {
      this.icon = icon;
      return this;
    }

    /**
     * Sets the value of {@link PrintableTestTitle#getKind}
     *
     * @param kind Either 'success' to indicate success, or 'failure' to indicate failure. This
     *             parameter is required.
     * @return {@code this}
     */
    public Builder kind(java.lang.String kind) {
      this.kind = kind;
      return this;
    }

    /**
     * Sets the value of {@link PrintableTestTitle#getTitle}
     *
     * @param title The title to print (will not include newlines). This parameter is required.
     * @return {@code this}
     */
    public Builder title(java.lang.String title) {
      this.title = title;
      return this;
    }

    /**
     * Builds the configured instance.
     *
     * @return a new instance of {@link PrintableTestTitle}
     * @throws NullPointerException if any required attribute was not provided
     */
    @Override
    public PrintableTestTitle build() {
      return new PrintableTestTitleImpl(this);
    }
  }

  /**
   * An implementation for {@link PrintableTestTitle}
   */
  final class PrintableTestTitleImpl implements
      PrintableTestTitle {

    private final java.lang.String additionalText;
    private final java.lang.String icon;
    private final java.lang.String kind;
    private final java.lang.String title;

    /**
     * Constructor that initializes the object based on literal property values passed by the
     * {@link Builder}.
     */
    private PrintableTestTitleImpl(final Builder builder) {
      this.additionalText = java.util.Objects.requireNonNull(
          builder.additionalText,
          "additionalText is required"
      );
      this.icon = java.util.Objects.requireNonNull(builder.icon, "icon is required");
      this.kind = java.util.Objects.requireNonNull(builder.kind, "kind is required");
      this.title = java.util.Objects.requireNonNull(builder.title, "title is required");
    }

    @Override
    public java.lang.@NotNull String getAdditionalText() {
      return this.additionalText;
    }

    @Override
    public java.lang.@NotNull String getIcon() {
      return this.icon;
    }

    @Override
    public java.lang.@NotNull String getKind() {
      return this.kind;
    }

    @Override
    public java.lang.@NotNull String getTitle() {
      return this.title;
    }


    @Override
    public boolean equals(final Object o) {
      if (this == o) {
        return true;
      }
      if (o == null || getClass() != o.getClass()) {
        return false;
      }

      PrintableTestTitleImpl that = (PrintableTestTitleImpl) o;

      if (!additionalText.equals(that.additionalText)) {
        return false;
      }
      if (!icon.equals(that.icon)) {
        return false;
      }
      if (!kind.equals(that.kind)) {
        return false;
      }
      return this.title.equals(that.title);
    }

    @Override
    public int hashCode() {
      int result = this.additionalText.hashCode();
      result = 31 * result + (this.icon.hashCode());
      result = 31 * result + (this.kind.hashCode());
      result = 31 * result + (this.title.hashCode());
      return result;
    }
  }
}
