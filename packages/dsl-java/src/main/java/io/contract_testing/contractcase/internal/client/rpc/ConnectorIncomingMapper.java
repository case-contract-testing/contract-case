package io.contract_testing.contractcase.internal.client.rpc;

import com.google.protobuf.StringValue;
import com.google.protobuf.Struct;
import com.google.protobuf.Value;
import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import io.contract_testing.contractcase.internal.edge.ConnectorFailure;
import io.contract_testing.contractcase.internal.edge.ConnectorResult;
import io.contract_testing.contractcase.internal.edge.ConnectorSetupInfo;
import io.contract_testing.contractcase.internal.edge.ConnectorSuccess;
import io.contract_testing.contractcase.internal.edge.ConnectorSuccessWithAny;
import io.contract_testing.contractcase.internal.edge.ConnectorSuccessWithMap;
import io.contract_testing.contractcase.internal.edge.InvokeCoreFunction;
import io.contract_testing.contractcase.logs.PrintableMatchError;
import io.contract_testing.contractcase.logs.PrintableMessageError;
import io.contract_testing.contractcase.logs.PrintableTestTitle;
import io.contract_testing.contractcase.grpc.ContractCaseStream;
import io.contract_testing.contractcase.grpc.ContractCaseStream.CoreFunctionHandle;
import io.contract_testing.contractcase.grpc.ContractCaseStream.PrintMatchErrorRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.PrintMessageErrorRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.PrintTestTitleRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.SetupInfo;
import io.contract_testing.contractcase.internal.client.MaintainerLog;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.function.BiFunction;
import java.util.stream.Collectors;
import org.jetbrains.annotations.NotNull;

public class ConnectorIncomingMapper {

  static String map(StringValue s) {
    if (s == null) {
      return null;
    }
    return s.getValue();
  }

  static Map<String, Object> map(Struct config) {
    return config.getFieldsMap().entrySet().stream()
        .map(entry -> Map.entry(entry.getKey(), ConnectorIncomingMapper.map(entry.getValue())))
        .collect(Collectors.toMap(Entry::getKey, Entry::getValue));
  }

  static Object map(Value value) {
    return switch (value.getKindCase()) {
      case NULL_VALUE -> null;
      case NUMBER_VALUE -> value.getNumberValue();
      case STRING_VALUE -> value.getStringValue();
      case BOOL_VALUE -> value.getBoolValue();
      case STRUCT_VALUE -> map(value.getStructValue());
      case LIST_VALUE ->
          value.getListValue().getValuesList().stream().map(ConnectorIncomingMapper::map).toList();
      case KIND_NOT_SET -> throw new ContractCaseCoreError(
          "Attempted to map a value that doesn't have a set kind. This is probably a bug in the core library",
          "Java ValueMapper"
      );
    };
  }

  @NotNull
  static PrintableMatchError mapMatchErrorRequest(PrintMatchErrorRequest printMatchErrorRequest) {
    return PrintableMatchError.builder()
        .kind(ConnectorIncomingMapper.map(printMatchErrorRequest.getKind()))
        .expected(ConnectorIncomingMapper.map(printMatchErrorRequest.getExpected()))
        .actual(ConnectorIncomingMapper.map(printMatchErrorRequest.getActual()))
        .errorTypeTag(ConnectorIncomingMapper.map(printMatchErrorRequest.getErrorTypeTag()))
        .location(ConnectorIncomingMapper.map(printMatchErrorRequest.getLocation()))
        .locationTag(ConnectorIncomingMapper.map(printMatchErrorRequest.getLocationTag()))
        .message(ConnectorIncomingMapper.map(printMatchErrorRequest.getMessage()))
        .build();
  }

  @NotNull
  static PrintableMessageError mapMessageErrorRequest(PrintMessageErrorRequest printMessageErrorRequest) {
    return PrintableMessageError.builder()
        .errorTypeTag(ConnectorIncomingMapper.map(printMessageErrorRequest.getErrorTypeTag()))
        .kind(ConnectorIncomingMapper.map(printMessageErrorRequest.getKind()))
        .location(ConnectorIncomingMapper.map(printMessageErrorRequest.getLocation()))
        .locationTag(ConnectorIncomingMapper.map(printMessageErrorRequest.getLocationTag()))
        .message(ConnectorIncomingMapper.map(printMessageErrorRequest.getMessage()))
        .build();
  }


  @NotNull
  static PrintableTestTitle mapPrintableTestTitle(PrintTestTitleRequest printTestTitleRequest) {
    return PrintableTestTitle.builder()
        .title(ConnectorIncomingMapper.map(printTestTitleRequest.getTitle()))
        .kind(ConnectorIncomingMapper.map(printTestTitleRequest.getKind()))
        .additionalText(ConnectorIncomingMapper.map(printTestTitleRequest.getAdditionalText()))
        .icon(ConnectorIncomingMapper.map(printTestTitleRequest.getIcon()))
        .build();
  }


  static ConnectorResult mapBoundaryResult(ContractCaseStream.BoundaryResult wireBoundaryResult) {
    if (wireBoundaryResult == null) {
      throw new ContractCaseCoreError(
          "There was a null boundaryResult. This is probably a bug in the connector server library.",
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
    }
    var resultType = wireBoundaryResult.getValueCase();
    switch (resultType) {
      case FAILURE -> {
        var wireFailure = wireBoundaryResult.getFailure();
        if (wireFailure == null) {
          throw new ContractCaseCoreError(
              "undefined wireFailure in a boundary result. This is probably an error in the connector server library.",
              MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
          );
        }
        return new ConnectorFailure(
            ConnectorIncomingMapper.map(wireFailure.getKind()),
            ConnectorIncomingMapper.map(wireFailure.getMessage()),
            ConnectorIncomingMapper.map(wireFailure.getLocation()),
            ConnectorIncomingMapper.map(wireFailure.getContractCaseErrorCode())
        );
      }
      case SUCCESS -> {
        return new ConnectorSuccess();
      }
      case SUCCESS_HAS_ANY -> {
        var wireWithAny = wireBoundaryResult.getSuccessHasAny();
        if (wireWithAny == null) {
          throw new ContractCaseCoreError(
              "undefined wire with any in a boundary result. This is probably an error in the connector server library.",
              MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
          );
        }
        return new ConnectorSuccessWithAny(ConnectorIncomingMapper.map(wireWithAny.getPayload()));
      }
      case SUCCESS_HAS_MAP -> {
        var wireWithMap = wireBoundaryResult.getSuccessHasMap();
        if (wireWithMap == null) {
          throw new ContractCaseCoreError(
              "undefined wire with map in a boundary result. This is probably an error in the connector server library.",
              MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
          );
        }
        return new ConnectorSuccessWithMap(ConnectorIncomingMapper.map(wireWithMap.getMap()));
      }
      case VALUE_NOT_SET -> throw new ContractCaseCoreError(
          "There was an unset boundaryResult. This is probably a bug in the connector server library.",
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
      default -> throw new ContractCaseCoreError(
          "There was a boundary result type that we didn't understand '" + resultType
              + "'. This is probably a bug in the connector server library.",
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
    }
  }

  static Map<String, String> map(Map<String, StringValue> stringValueMap) {
    return stringValueMap.entrySet().stream()
        .map(entry -> Map.entry(entry.getKey(), ConnectorIncomingMapper.map(entry.getValue())))
        .collect(Collectors.toMap(Entry::getKey, Entry::getValue));
  }

  public static ConnectorSetupInfo map(SetupInfo setup,
      BiFunction<String, List<String>, ConnectorResult> callFunction) {
    return new ConnectorSetupInfo(
        map(setup.getStateVariablesMap()),
        map(setup.getMockMap()),
        mapFunctions(setup.getFunctionsMap(), callFunction)
    );
  }

  private static Map<String, InvokeCoreFunction> mapFunctions(Map<String, CoreFunctionHandle> functionsMap,
      BiFunction<String, List<String>, ConnectorResult> callFunction) {
    return functionsMap.entrySet().stream()
        .map(entry -> Map.entry(
            entry.getKey(),
            ConnectorIncomingMapper.map(entry.getValue().getHandle())
        )).collect(Collectors.toMap(
            Entry::getKey,
            entry -> (args) -> callFunction.apply(entry.getValue(), args)
        ));
  }
}
