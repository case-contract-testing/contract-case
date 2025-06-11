import {
  AnyMockDescriptorType,
  CaseConfig,
  TestInvoker,
} from '@contract-case/case-core';

type Invoker = Partial<TestInvoker<AnyMockDescriptorType, unknown>>;

export const mergeInvokers = (
  initialInvoker: Invoker,
  partialInvoker: Invoker,
): Invoker => ({
  ...initialInvoker,
  ...partialInvoker,
  stateHandlers: {
    ...initialInvoker.stateHandlers,
    ...partialInvoker.stateHandlers,
  },
  triggers: {
    ...initialInvoker.triggers,
    ...partialInvoker.triggers,
  },
  triggerAndTests: {
    ...initialInvoker.triggerAndTests,
    ...partialInvoker.triggerAndTests,
  },
});

export const mergeConfig = (
  initialConfig: CaseConfig,
  config: CaseConfig,
): CaseConfig => ({
  ...initialConfig,
  ...config,
  ...('adviceOverrides' in initialConfig || 'adviceOverrides' in config
    ? {
        adviceOverrides: {
          ...initialConfig.adviceOverrides,
          ...config.adviceOverrides,
        },
      }
    : {}),
  ...('internals' in initialConfig || 'internals' in config
    ? {
        internals: {
          ...initialConfig.internals,
          ...config.internals,
        } as { asyncVerification: boolean },
      }
    : {}),
  ...('mockConfig' in initialConfig || 'mockConfig' in config
    ? { mockConfig: { ...initialConfig.mockConfig, ...config.mockConfig } }
    : {}),
});
