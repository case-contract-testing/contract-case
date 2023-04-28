import { BoundaryResult } from './Result';

export interface ITriggerFunction {
  trigger(config: Record<string, unknown>): Promise<BoundaryResult>;
}
