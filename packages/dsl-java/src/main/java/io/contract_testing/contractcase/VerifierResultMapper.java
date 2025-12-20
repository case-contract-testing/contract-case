package io.contract_testing.contractcase;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonParser.Feature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.contract_testing.contractcase.configuration.ContractDescription;
import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import java.util.HashMap;
import java.util.Map;

class VerifierResultMapper {
    private static final ObjectMapper mapper = new ObjectMapper()
            .configure(Feature.INCLUDE_SOURCE_IN_LOCATION, true);

    public static VerificationResult map(String payload) {
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
            return new VerificationResult(contractPath, description, consumerSlug, providerSlug, metadata);
        } catch (JsonProcessingException e) {
            throw new ContractCaseCoreError("Unable to parse the VerificationResult", e);
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
}