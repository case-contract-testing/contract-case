package io.contract_testing.contractcase;

import com.fasterxml.jackson.core.JsonParser.Feature;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableList;
import io.contract_testing.contractcase.configuration.ContractDescription;
import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class VerifierResultMapper {

  private static final ObjectMapper mapper = new ObjectMapper()
      .configure(Feature.INCLUDE_SOURCE_IN_LOCATION, true);

  public static VerificationResult toVerificationResult(String payload) {
    try {
      JsonNode root = mapper.readTree(payload);
      String contractPath = root.has("contractPath") ? root.get("contractPath").asText() : null;
      ContractDescription description = null;
      if (root.has("description")) {
        description = mapper.treeToValue(root.get("description"), ContractDescription.class);
      }
      String consumerSlug = root.has("consumerSlug") ? root.get("consumerSlug").asText() : null;
      String providerSlug = root.has("providerSlug") ? root.get("providerSlug").asText() : null;
      Map<String, String> metadata = new HashMap<>();
      if (root.has("metadata")) {
        flatten(root.get("metadata"), "", metadata);
      }
      return new VerificationResult(
          contractPath,
          description,
          consumerSlug,
          providerSlug,
          metadata
      );
    } catch (JsonProcessingException e) {
      throw new ContractCaseCoreError("Unable to parse the VerificationResult", e);
    }
  }

  public static List<VerificationHandle> toVerificationHandles(String payload) {
    try {
      var listBuilder = ImmutableList.<VerificationHandle>builder();
      JsonNode root = mapper.readTree(payload);
      if (!root.isArray()) {
        throw new ContractCaseCoreError(
            "Response from core wasn't an array. \nBad response was:\n" + payload);

      }
      for (JsonNode node : root) {
        listBuilder.add(toVerificationHandle(node));
      }
      return listBuilder.build();

    } catch (JsonProcessingException e) {
      throw new ContractCaseCoreError("Unable to parse the VerificationHandles", e);
    }
  }

  private static void flatten(JsonNode node, String prefix, Map<String, String> map) {
    if (node.isObject()) {
      var fields = node.properties();
      for (Map.Entry<String, JsonNode> field : fields) {
        String key = field.getKey();
        JsonNode value = field.getValue();
        String newKey = prefix.isEmpty() ? key : prefix + "." + key;
        if (value.isObject()) {
          flatten(value, newKey, map);
        } else {
          map.put(newKey, value.asText());
        }
      }
    } else {
      if (!prefix.isEmpty()) {
        map.put(prefix, node.asText());
      }
    }
  }

  private static VerificationHandle toVerificationHandle(JsonNode root)
      throws JsonProcessingException {
    String contractPath = root.has("contractPath") ? root.get("contractPath").asText() : null;
    ContractDescription description = null;
    if (root.has("description")) {
      description = mapper.treeToValue(root.get("description"), ContractDescription.class);
    }
    List<VerificationTestHandle> tests = List.of();
    if (root.has("testHandles")) {
      try {
        tests = mapper.readValue(
            root.get("testHandles").traverse(mapper),
            new TypeReference<List<VerificationTestHandle>>() {
            }
        );
      } catch (IOException e) {
        throw new ContractCaseCoreError("Unable to parse testHandles", e);
      }
    }
    Integer contractIndex = root.has("contractIndex") ? root.get("contractIndex").asInt() : null;
    Map<String, String> metadata = new HashMap<>();
    if (root.has("metadata")) {
      flatten(root.get("metadata"), "", metadata);
    }
    return new VerificationHandle(
        contractPath,
        contractIndex,
        description,
        metadata,
        tests
    );
  }
}