package io.contract_testing.contractcase.logs;

import java.util.Objects;
import org.jetbrains.annotations.NotNull;

/**
 * Data class to hold data for a test title print line.
 */
public interface PrintableTestTitle {

  /**
   * Any additional text to print after the title (may include newlines).
   */
  @NotNull String getAdditionalText();

  /**
   * An icon for the start of the line (usually a single character emoji, but could be any string).
   */
  @NotNull String getIcon();

  /**
   * Either 'success' to indicate success, or 'failure' to indicate failure.
   */
  @NotNull String getKind();

  /**
   * The title to print (will not include newlines).
   */
  @NotNull String getTitle();

  /**
   * @return a {@link Builder} of {@link PrintableTestTitle}
   */
  static Builder builder() {
    return new Builder();
  }

  /**
   * A builder for {@link PrintableTestTitle}
   */
  final class Builder {

    String additionalText;
    String icon;
    String kind;
    String title;

    /**
     * Sets the value of {@link PrintableTestTitle#getAdditionalText}
     *
     * @param additionalText Any additional text to print after the title (may include newlines).
     *                       This parameter is required.
     * @return {@code this}
     */
    public Builder additionalText(String additionalText) {
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
    public Builder icon(String icon) {
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
    public Builder kind(String kind) {
      this.kind = kind;
      return this;
    }

    /**
     * Sets the value of {@link PrintableTestTitle#getTitle}
     *
     * @param title The title to print (will not include newlines). This parameter is required.
     * @return {@code this}
     */
    public Builder title(String title) {
      this.title = title;
      return this;
    }

    /**
     * Builds the configured instance.
     *
     * @return a new instance of {@link PrintableTestTitle}
     * @throws NullPointerException if any required attribute was not provided
     */
    public PrintableTestTitle build() {
      return new PrintableTestTitleImpl(this);
    }
  }

  /**
   * An implementation for {@link PrintableTestTitle}
   */
  final class PrintableTestTitleImpl implements
      PrintableTestTitle {

    private final String additionalText;
    private final String icon;
    private final String kind;
    private final String title;

    /**
     * Constructor that initializes the object based on literal property values passed by the
     * {@link Builder}.
     */
    private PrintableTestTitleImpl(final Builder builder) {
      this.additionalText = Objects.requireNonNull(
          builder.additionalText,
          "additionalText is required"
      );
      this.icon = Objects.requireNonNull(builder.icon, "icon is required");
      this.kind = Objects.requireNonNull(builder.kind, "kind is required");
      this.title = Objects.requireNonNull(builder.title, "title is required");
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
