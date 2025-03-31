import {
  DataContext,
  HasContractFileConfig,
} from '@contract-case/case-plugin-base';

// TODO: Consider moving this out or replacing it.
// If it's useful, it should be part of the context helper functions in the
// plugin base. If it's not useful, we should just replace it with "are these fields present"

const checkCurrentRunField = <T extends DataContext>(
  context: DataContext,
  configName: string,
) => {
  const maybeCaseContractConfig = context as T;
  const fieldName = `_case:currentRun:context:${configName}`;
  if (fieldName in maybeCaseContractConfig) {
    const value = maybeCaseContractConfig[fieldName as keyof T];
    if (typeof value === 'string' && value !== '') {
      context.logger.maintainerDebug(
        `Validated config field '${fieldName}', accepted '${value}'`,
      );
      return true;
    }
    context.logger.maintainerDebug(
      `Failed validation for config field '${fieldName}', failed value was (${JSON.stringify(value)})`,
      context,
    );
    context.logger.error(
      `Configuration field '${configName}' should be a non-empty string, but instead it was: ${JSON.stringify(value)}`,
    );
  } else {
    context.logger.maintainerDebug(
      `Failed validation for config field '${fieldName}', not present in context`,
      context,
    );
    context.logger.error(
      `Missing configuration field '${configName}'. Please ensure it is set to a non-empty string.`,
    );
  }

  return false;
};

const checkStringContextFieldsPresent = (
  context: DataContext,
  ...fields: string[]
) =>
  fields
    .map((field) => checkCurrentRunField(context, field))
    .reduce((acc, curr) => acc && curr, true);

export const isHasContractFileConfig = (
  context: DataContext,
): context is HasContractFileConfig =>
  checkStringContextFieldsPresent(context, 'testRunId', 'contractDir');
