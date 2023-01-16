import { CaseConfigurationError } from 'entities/CaseConfigurationError';
import type { AnyCaseNodeOrData } from 'entities/types';
import type { MatchContext } from './types';

export const addDefaultVariable = (
  name: string,
  stateName: string,
  value: AnyCaseNodeOrData,
  context: MatchContext
): MatchContext => {
  context.logger.debug(
    `Setting state variable '${name}' from state '${stateName}' to`,
    value
  );

  if (context['case:currentRun:context:runVariables'][name] !== undefined) {
    context.logger.debug(
      `The variable '${name}' from state '${stateName}' already has a value. It was already set to`,
      context['case:currentRun:context:runVariables'][name]?.value,
      `by state '${context['case:currentRun:context:runVariables'][name]?.stateName}. The attempted new value was:`,
      value
    );
    context.logger.error(
      `The variable '${name}' already has a value. It was:`,
      context['case:currentRun:context:runVariables'][name]?.value,
      'and it was being set to',
      value
    );
    throw new CaseConfigurationError(
      `Attempted to set a defaullt for the variable '${name}' from state '${stateName}', but that variable was already set by state '${context['case:currentRun:context:runVariables'][name]?.stateName}'. Update these states so that the variable names don't collide.`
    );
  }
  context.logger.maintainerDebug(
    `State '${stateName}' is setting variable '${name}' to default to`,
    value
  );

  const nextContext: MatchContext = {
    ...context,
    'case:currentRun:context:runVariables': {
      ...context['case:currentRun:context:runVariables'],
      [name]: {
        source: 'default',
        stateName,
        value,
      },
    },
  };
  const logger = nextContext.makeLogger(nextContext);
  return { ...nextContext, logger };
};

export const addStateSetupVariable = (
  name: string,
  stateName: string,
  value: AnyCaseNodeOrData,
  context: MatchContext
): MatchContext => {
  context.logger.debug(
    `Setting state variable '${name}' from state '${stateName}' to`,
    value
  );

  if (context['case:currentRun:context:runVariables'][name] !== undefined) {
    if (
      context['case:currentRun:context:runVariables'][name]?.source === 'state'
    ) {
      context.logger.debug(
        `The variable '${name}' from state '${stateName}' already has a value. It was already set to`,
        context['case:currentRun:context:runVariables'][name]?.value,
        `by state '${context['case:currentRun:context:runVariables'][name]?.stateName}. The attempted new value was:`,
        value
      );
      context.logger.error(
        `The variable '${name}' already has a value. It was:`,
        context['case:currentRun:context:runVariables'][name]?.value,
        'and it was being set to',
        value
      );
      throw new CaseConfigurationError(
        `Attempted to set a value for the variable '${name}' from state '${stateName}', but it was already set by state '${context['case:currentRun:context:runVariables'][name]?.stateName}'`
      );
    }
    context.logger.maintainerDebug(
      `State '${stateName}' is overwriting variable '${name}' to`,
      value,
      `, was`,
      context['case:currentRun:context:runVariables'][name]?.value
    );
  }

  const nextContext: MatchContext = {
    ...context,
    'case:currentRun:context:runVariables': {
      ...context['case:currentRun:context:runVariables'],
      [name]: {
        source: 'state',
        stateName,
        value,
      },
    },
  };
  const logger = nextContext.makeLogger(nextContext);
  return { ...nextContext, logger };
};
