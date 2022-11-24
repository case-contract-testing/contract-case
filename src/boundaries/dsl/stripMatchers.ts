import { makeLogger } from 'connectors/logger';
import { coreStripMatchers } from 'connectors/core';
import type { AnyCaseNodeOrData, AnyData } from 'entities/nodes/matchers/types';

export const stripMatchers = (expectation: AnyCaseNodeOrData): AnyData =>
  coreStripMatchers(expectation, makeLogger);
