package io.contract_testing.contractcase;


import io.contract_testing.contractcase.edge.ConnectorExceptionMapper;
import io.contract_testing.contractcase.edge.ConnectorSuccess;
import io.contract_testing.contractcase.edge.ITriggerFunction;

class BoundaryTriggerMapper {

  static <T> ITriggerFunction map(
      Trigger<T> trigger,
      TestResponseFunction<T> testResponseFunction) {

    return connectorSetupInfo -> {

      InteractionSetup interactionSetup;
      try {
        interactionSetup = InteractionSetup.from(connectorSetupInfo);
      } catch (Exception e) {
        return ConnectorExceptionMapper.map(e);
      }

      T ret;
      try {
        ret = trigger.call(interactionSetup);
      } catch (Exception e) {
        return ConnectorExceptionMapper.mapAsTriggerFailure(e);
      }

      try {
        testResponseFunction.call(ret, interactionSetup);
      } catch (Exception e) {
        return ConnectorExceptionMapper.mapAsVerifyFailure(e);
      }

      return new ConnectorSuccess();
    };
  }

  static <T> ITriggerFunction map(Trigger<T> trigger,
      TestErrorResponseFunction testErrorResponseFunction) {
    return connectorSetupInfo -> {
      InteractionSetup interactionSetup;
      try {
        interactionSetup = InteractionSetup.from(connectorSetupInfo);
      } catch (Exception e) {
        return ConnectorExceptionMapper.map(e);
      }
      try {
        trigger.call(interactionSetup);
        return ConnectorExceptionMapper.mapAsTriggerFailure(
            new RuntimeException("Expected the trigger to fail, but it did not"));
      } catch (Exception triggerException) {
        try {
          testErrorResponseFunction.call(triggerException, interactionSetup);
        } catch (Exception verifyException) {
          return ConnectorExceptionMapper.mapAsVerifyFailure(verifyException);
        }
      }

      return new ConnectorSuccess();
    };
  }
}
