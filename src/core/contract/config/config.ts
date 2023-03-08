import type { RunContext } from '../../../entities/types';

import type { CaseConfig } from './types';

export const configToRunContext = (config: CaseConfig): RunContext =>
  Object.entries(config)
    .map(([k, v]) => ({
      [`case:currentRun:context:${k}`]: v,
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {} as RunContext);
