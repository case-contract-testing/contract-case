package io.contract_testing.contractcase;


import io.contract_testing.contractcase.edge.ConnectorExceptionMapper;
import io.contract_testing.contractcase.edge.ConnectorSuccess;
import io.contract_testing.contractcase.edge.ITriggerFunction;

class BoundaryTriggerMapper {

  static <T> ITriggerFunction map(
      Trigger<T> trigger,
      TestResponseFunction<T> testResponseFunction) {

    return connectorSetupInfo -> {

      SetupInfo setupInfo;
      try {
        setupInfo = SetupInfo.from(connectorSetupInfo);
      } catch (Throwable e) {
        return ConnectorExceptionMapper.map(e);
      }

      T ret;
      try {
        ret = trigger.call(setupInfo);
      } catch (Throwable e) {
        return ConnectorExceptionMapper.mapAsTriggerFailure(e);
      }

      try {
        testResponseFunction.call(ret, setupInfo);
      } catch (Throwable e) {
        return ConnectorExceptionMapper.mapAsVerifyFailure(e);
      }

      return new ConnectorSuccess();
    };
  }

  static <T> ITriggerFunction map(Trigger<T> trigger,
      TestErrorResponseFunction testErrorResponseFunction) {
    return connectorSetupInfo -> {
      SetupInfo setupInfo;
      try {
        setupInfo = SetupInfo.from(connectorSetupInfo);
      } catch (Throwable e) {
        return ConnectorExceptionMapper.map(e);
      }
      try {
        trigger.call(setupInfo);
        return ConnectorExceptionMapper.mapAsTriggerFailure(
            new RuntimeException("Expected the trigger to fail, but it did not"));
      } catch (Throwable triggerException) {
        try {
          testErrorResponseFunction.call(triggerException, setupInfo);
        } catch (Throwable verifyException) {
          return ConnectorExceptionMapper.mapAsVerifyFailure(verifyException);
        }
      }

      return new ConnectorSuccess();
    };
  }
}
