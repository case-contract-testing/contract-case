import { Groups, ITriggerGroups, TriggerGroup } from '../entities';

export class TriggerGroupMap implements ITriggerGroups {
  groups: Groups = {};

  addTriggerGroup<R, C extends Record<string, unknown>>(
    name: string,
    group: TriggerGroup<R, C>
  ): ITriggerGroups {
    this.groups[name] = group as TriggerGroup<unknown, Record<string, unknown>>;
    return this;
  }
}
