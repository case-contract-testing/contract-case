import type {
  Groups,
  TriggerGroups,
  TriggerGroup,
} from '@contract-case/contract-case-connector-js';

export class TriggerGroupMap implements TriggerGroups {
  groups: Groups = {};

  addTriggerGroup<R, C extends Record<string, string>>(
    name: string,
    group: TriggerGroup<R, C>,
  ): TriggerGroups {
    this.groups[name] = group as TriggerGroup<unknown, Record<string, string>>;
    return this;
  }
}
