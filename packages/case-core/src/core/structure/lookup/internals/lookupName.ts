import { CaseCoreError } from '@contract-case/case-plugin-base';
import { LookupType } from './types';

export const lookupName = ({
  lookupType,
  uniqueName,
}: {
  lookupType: LookupType;
  uniqueName: string;
}): string => `${lookupType}:${uniqueName}`;

export const stripType = ({
  lookupType,
  name,
}: {
  lookupType: LookupType;
  name: string;
}): string => {
  const prefix = `${lookupType}:`;
  if (!name.startsWith(prefix)) {
    throw new CaseCoreError(
      `Tried to strip '${prefix}' from ${name} - stripName must have been called incorrectly`,
    );
  }
  return name.slice(prefix.length);
};
