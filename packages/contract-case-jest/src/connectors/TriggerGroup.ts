import { Groups, TriggerGroups, TriggerGroup } from '../entities';

export class TriggerGroupMap implements TriggerGroups {
  groups: Groups = {};

  addTriggerGroup<R, C extends Record<string, unknown>>(
    name: string,
    group: TriggerGroup<R, C>
  ): TriggerGroups {
    this.groups[name] = group as TriggerGroup<unknown, Record<string, unknown>>;
    return this;
  }
}
