import { Result } from './Result';

export interface ITriggerFunction {
  trigger: () => Promise<Result>;
}
