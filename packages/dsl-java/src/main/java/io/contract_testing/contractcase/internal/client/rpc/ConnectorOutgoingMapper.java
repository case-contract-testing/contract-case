package io.contract_testing.contractcase.internal.client.rpc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.protobuf.BoolValue;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.StringValue;
import com.google.protobuf.Struct;
import com.google.protobuf.util.JsonFormat;
import io.contract_testing.contractcase.configuration.ContractToWrite;
import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import io.contract_testing.contractcase.grpc.ContractCaseStream;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ContractCaseConfig;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ContractCaseConfig.UsernamePassword;
import io.contract_testing.contractcase.grpc.ContractCaseStream.DefinitionRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ResultFailure;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ResultResponse;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ResultSuccess;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ResultSuccessHasAnyPayload;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ResultSuccessHasMapPayload;
import io.contract_testing.contractcase.grpc.ContractCaseStream.RunInteractionRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.RunRejectingInteractionRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.StateHandlerHandle;
import io.contract_testing.contractcase.grpc.ContractCaseStream.StateHandlerHandle.Stage;
import io.contract_testing.contractcase.grpc.ContractCaseStream.TriggerFunctionHandle;
import io.contract_testing.contractcase.internal.client.MaintainerLog;
import io.contract_testing.contractcase.internal.edge.ConnectorFailure;
import io.contract_testing.contractcase.internal.edge.ConnectorFailureKindConstants;
import io.contract_testing.contractcase.internal.edge.ConnectorResult;
import io.contract_testing.contractcase.internal.edge.ConnectorResultTypeConstants;
import io.contract_testing.contractcase.internal.edge.ConnectorSuccessWithAny;
import io.contract_testing.contractcase.internal.edge.ConnectorSuccessWithMap;
import io.contract_testing.contractcase.internal.edge.ContractCaseConnectorConfig;
import java.util.Map;
import org.jetbrains.annotations.NotNull;

public class ConnectorOutgoingMapper {

  public static final String CONTRACT_CASE_TRIGGER_AND_TEST = "ContractCase::TriggerAndTest";

  private static final ObjectMapper objectMapper = new ObjectMapper();

  public static StringValue map(String s) {
    if (s == null) {
      return null;
    }
    return StringValue.newBuilder().setValue(s).build();
  }

  static BoolValue map(Boolean s) {
    if (s == null) {
      return null;
    }
    return BoolValue.newBuilder().setValue(s).build();
  }

  public static ContractCaseConfig mapConfig(final @NotNull ContractCaseConnectorConfig config) {
    var builder = ContractCaseConfig.newBuilder();

    if (config.getBrokerBasicAuth() != null) {
      var auth = config.getBrokerBasicAuth();
      builder.setBrokerBasicAuth(UsernamePassword.newBuilder()
          .setPassword(ConnectorOutgoingMapper.map(auth.password()))
          .setUsername(ConnectorOutgoingMapper.map(auth.username()))
          .build());
    }

    if (config.getPrintResults() != null) {
      builder.setPrintResults(ConnectorOutgoingMapper.map(config.getPrintResults()));
    }
    if (config.getThrowOnFail() != null) {
      builder.setThrowOnFail(ConnectorOutgoingMapper.map(config.getThrowOnFail()));
    }
    if (config.getTriggerAndTests() != null) {
      config.getTriggerAndTests()
          .forEach((key, value) -> builder.putTriggerAndTests(
              key,
              TriggerFunctionHandle.newBuilder()
                  .setHandle(ConnectorOutgoingMapper.map(key))
                  .build()
          ));
    }
    if (config.getTriggerAndTest() != null) {
      builder.setTriggerAndTest(TriggerFunctionHandle.newBuilder()
          .setHandle(ConnectorOutgoingMapper.map(CONTRACT_CASE_TRIGGER_AND_TEST))
          .build());
    }

    if (config.getConnectorStateHandlers() != null) {
      config.getConnectorStateHandlers().forEach((key, value) -> {
        builder.addStateHandlers(StateHandlerHandle.newBuilder()
            .setHandle(ConnectorOutgoingMapper.map(key))
            .setStage(Stage.STAGE_SETUP_UNSPECIFIED)
            .build());

        builder.addStateHandlers(StateHandlerHandle.newBuilder()
            .setHandle(ConnectorOutgoingMapper.map(key))
            .setStage(Stage.STAGE_TEARDOWN)
            .build());
      });
    }

    if (config.getBaseUrlUnderTest() != null) {
      builder.setBaseUrlUnderTest(ConnectorOutgoingMapper.map(config.getBaseUrlUnderTest()));
    }

    if (config.getBrokerBaseUrl() != null) {
      builder.setBrokerBaseUrl(ConnectorOutgoingMapper.map(config.getBrokerBaseUrl()));
    }
    if (config.getBrokerCiAccessToken() != null) {
      builder.setBrokerCiAccessToken(ConnectorOutgoingMapper.map(config.getBrokerCiAccessToken()));
    }

    if (config.getConsumerName() != null) {
      builder.setConsumerName(ConnectorOutgoingMapper.map(config.getConsumerName()));
    }
    if (config.getContractDir() != null) {
      builder.setContractDir(ConnectorOutgoingMapper.map(config.getContractDir()));
    }
    if (config.getContractFilename() != null) {
      builder.setContractFilename(ConnectorOutgoingMapper.map(config.getContractFilename()));
    }
    if (config.getChangedContracts() != null) {
      builder.setChangedContracts(ConnectorOutgoingMapper.map(
          config.getChangedContracts().toString()));
    }
    if (config.getLogLevel() != null) {
      builder.setLogLevel(ConnectorOutgoingMapper.map(config.getLogLevel().toString()));
    }
    if (config.getProviderName() != null) {
      builder.setProviderName(ConnectorOutgoingMapper.map(config.getProviderName()));
    }

    if (config.getPublish() != null) {
      builder.setPublish(ConnectorOutgoingMapper.map(config.getPublish().toString()));
    }

    if (config.getAutoVersionFrom() != null) {
      builder.setAutoVersionFrom(ConnectorOutgoingMapper.map(config.getAutoVersionFrom()
          .toString()));
    }

    if (config.getMockConfig() != null) {
      config.getMockConfig().forEach((String k, Map<String, String> v) -> {
        try {
          builder.putMockConfig(k, objectMapper.writeValueAsString(v));
        } catch (JsonProcessingException e) {
          throw new ContractCaseCoreError(
              "Unable to write mockConfig for '" + k + "' to string",
              e
          );
        }
      });
    }

    if (config.getContractsToWrite() != null) {
      builder.addAllContractsToWrite(config.getContractsToWrite()
          .stream()
          .map(ContractToWrite::toString)
          .map(ConnectorOutgoingMapper::map)
          .toList());
    }

    if (config.getAdviceOverrides() != null) {
      config.getAdviceOverrides().forEach(builder::putAdviceOverrides);
    }

    return builder.build();
  }


  @NotNull
  public static ContractCaseStream.DefinitionRequest.Builder mapRunInteractionRequest(JsonNode definition,
      @NotNull ContractCaseConnectorConfig runConfig) {
    final var structBuilder = getStructBuilder(definition);
    return DefinitionRequest.newBuilder()
        .setRunInteraction(RunInteractionRequest.newBuilder()
            .setConfig(ConnectorOutgoingMapper.mapConfig(runConfig)) // TODO handle additional state handlers or triggers
            .setExampleDefinition(structBuilder)
            .build());
  }

  public static ContractCaseStream.DefinitionRequest.Builder mapRunRejectingInteractionRequest(
      JsonNode definition,
      ContractCaseConnectorConfig runConfig) {
    final var structBuilder = getStructBuilder(definition);
    return DefinitionRequest.newBuilder()
        .setRunRejectingInteraction(RunRejectingInteractionRequest.newBuilder()
            .setConfig(ConnectorOutgoingMapper.mapConfig(runConfig)) // TODO handle additional state handlers or triggers
            .setExampleDefinition(structBuilder)
            .build());
  }


  @NotNull
  static ContractCaseStream.BoundaryResult mapResult(@NotNull ConnectorResult result) {
    var resultType = result.getResultType();
    // MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Mapping result type: " + resultType);
    if (resultType == null) {
      throw new ContractCaseCoreError("Got a null result type at: " + result);
    }
    return switch (resultType) {
      case ConnectorResultTypeConstants.RESULT_SUCCESS ->
          ContractCaseStream.BoundaryResult.newBuilder()
              .setSuccess(ResultSuccess.newBuilder().build())
              .build();
      case ConnectorResultTypeConstants.RESULT_FAILURE -> {
        var failure = ((ConnectorFailure) result);
        yield ContractCaseStream.BoundaryResult.newBuilder()
            .setFailure(ResultFailure.newBuilder()
                .setKind(ConnectorOutgoingMapper.map(failure.getKind()))
                .setLocation(ConnectorOutgoingMapper.map(failure.getLocation()))
                .setMessage(ConnectorOutgoingMapper.map(failure.getMessage()))
                .setContractCaseErrorCode(ConnectorOutgoingMapper.map(failure.getErrorCode()))
                .setUserFacingStackTrace(ConnectorOutgoingMapper.map(failure.getUserFacingStackTrace()))
                .build())
            .build();
      }
      case ConnectorResultTypeConstants.RESULT_SUCCESS_HAS_MAP_PAYLOAD ->
          ContractCaseStream.BoundaryResult.newBuilder()
              .setSuccessHasMap(ResultSuccessHasMapPayload.newBuilder()
                  .setMap(mapMapToStruct(((ConnectorSuccessWithMap) result).getPayload()))
                  .build())
              .build();
      case ConnectorResultTypeConstants.RESULT_SUCCESS_HAS_ANY_PAYLOAD ->
          ContractCaseStream.BoundaryResult.newBuilder()
              .setSuccessHasAny(ResultSuccessHasAnyPayload.newBuilder()
                  .setPayload(map(((ConnectorSuccessWithAny) result).getPayload()))
                  .build())
              .build();
      default -> ContractCaseStream.BoundaryResult.newBuilder()
          .setFailure(ResultFailure.newBuilder()
              .setKind(ConnectorOutgoingMapper.map(ConnectorFailureKindConstants.CASE_CORE_ERROR))
              .setLocation(ConnectorOutgoingMapper.map(MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER))
              .setMessage(ConnectorOutgoingMapper.map(
                  "Tried to map an unknown result type: '" + resultType
              ))
              .setContractCaseErrorCode(ConnectorOutgoingMapper.map("UNDOCUMENTED"))
              .setUserFacingStackTrace(ConnectorOutgoingMapper.map("ConnectorOutgoingMapper"))
              .build())
          .build();
    };
  }

  static ResultResponse mapResultResponse(ConnectorResult result) {
    return ResultResponse.newBuilder()
        .setResult(mapResult(result)).build();
  }


  private static Struct mapMapToStruct(Map<String, Object> payload) {
    return getStructBuilder(objectMapper.valueToTree(payload)).build();
  }

  @NotNull
  private static Struct.Builder getStructBuilder(JsonNode definition) {
    final var structBuilder = Struct.newBuilder();

    try {
      JsonFormat.parser()
          .merge(objectMapper.writeValueAsString(definition), structBuilder);
    } catch (JsonProcessingException | InvalidProtocolBufferException e) {
      throw new RuntimeException(e);
    }
    return structBuilder;
  }
}
