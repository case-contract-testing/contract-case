package io.contract_testing.contractcase.internal.edge;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.JsonNode;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class ConnectorInvokableFunctionMapperTest {

  /**
   * Tests the serialisation of error internals.
   * <p>
   * Because object matching is subset-only, we cannot write a contract which passes when unwanted
   * properties are absent and fails when they are present. We therefore cannot test end-to-end
   * as is done in {@code io.contract_testing.contractcase.test}.
   */
  @Nested
  class ErrorInternalsMapper {

    private static final String USER_PROPERTY_VALUE = "kept";

    static class PlainException extends RuntimeException {

      PlainException(String message) {
        super(message);
      }

      public String getUserProperty() {
        return USER_PROPERTY_VALUE;
      }
    }

    /**
     * A class-level {@link JsonIgnoreProperties} always takes precedence over one inherited from
     * a supertype. This class is used to check that the force-ignored properties from
     * {@link Throwable} are not reintroduced into serialised error internals, and that they are
     * added to the properties the exception ignores itself rather than replacing them.
     */
    @JsonIgnoreProperties("ignoredProperty")
    static class DeclaresOwnIgnorePropertiesException extends RuntimeException {

      DeclaresOwnIgnorePropertiesException(String message) {
        super(message);
      }

      public String getUserProperty() {
        return USER_PROPERTY_VALUE;
      }

      public String getIgnoredProperty() {
        return "bar";
      }
    }

    @Test
    void testStripsTheThrowablePropertiesOfAPlainException() {
      assertThrowablePropertiesAreStripped(serialise(new PlainException("foo")));
    }

    @Test
    void testStripsTheThrowablePropertiesOfAnAnnotatedException() {
      assertThrowablePropertiesAreStripped(
          serialise(new DeclaresOwnIgnorePropertiesException("foo")));
    }

    @Test
    void testSerialisesPropertiesDefinedByAnUnannotatedException() {
      assertThat(serialise(new PlainException("foo")).get("userProperty").asText())
          .isEqualTo(USER_PROPERTY_VALUE);
    }

    @Test
    void testHonoursThePropertiesIgnoredByTheExceptionItself() {
      var serialised = serialise(new DeclaresOwnIgnorePropertiesException("foo"));

      assertThat(serialised.has("ignoredProperty")).isFalse();
      assertThat(serialised.get("userProperty").asText()).isEqualTo(USER_PROPERTY_VALUE);
    }

    private JsonNode serialise(Throwable thrown) {
      return ConnectorInvokableFunctionMapper.errorInternalsMapper().valueToTree(thrown);
    }

    private void assertThrowablePropertiesAreStripped(JsonNode serialised) {
      assertThat(serialised.has("stackTrace")).isFalse();
      assertThat(serialised.has("cause")).isFalse();
      assertThat(serialised.has("suppressed")).isFalse();
      assertThat(serialised.has("localizedMessage")).isFalse();
      assertThat(serialised.has("message")).isFalse();
    }
  }
}
