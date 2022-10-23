import { makeLogger } from 'connectors/logger';
import { coreStripMatchers } from 'core';
import type { AnyCaseNodeOrData, AnyData } from 'entities/nodes/matchers/types';

export const stripMatchers = (expectation: AnyCaseNodeOrData): AnyData =>
  coreStripMatchers(expectation, makeLogger);
