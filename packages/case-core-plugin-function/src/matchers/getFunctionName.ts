import {
  CaseConfigurationError,
  MatchContext,
} from '@contract-case/case-plugin-base';

export const getFunctionName = (context: MatchContext): string => {
  if (!('_case:currentRun:context:pluginProvided' in context)) {
    context.logger.maintainerDebug(
      'Unable to get pluginProvided context - context is: ',
      context,
    );
    throw new CaseConfigurationError(
      'Unable to get pluginProvided context - this matcher must be running outside a mockFunctionCaller or mockFunctionExecution',
      context,
      'BAD_INTERACTION_DEFINITION',
    );
  }
  const { functionName } = context['_case:currentRun:context:pluginProvided'];
  if (typeof functionName !== 'string') {
    context.logger.error(
      'Plugin provided context was present, but functionName was not present or not a string. Function name was:',
      functionName,
    );

    context.logger.maintainerDebug(
      'Plugin provided context is: ',
      context['_case:currentRun:context:pluginProvided'],
    );
    throw new CaseConfigurationError(
      `There was no functionName set to use as a handle to call this function.
     
      Please ensure that you have set a functionName for this interaction.

      This might indicate that the function arguments matcher is being used outside a function interaction.`,
      context,
      'BAD_INTERACTION_DEFINITION',
    );
  }
  return functionName;
};
