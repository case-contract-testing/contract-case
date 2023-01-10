import type { CaseExample } from './types';

export const nameExample = (
  { states, interaction }: CaseExample,
  index: string
): string => {
  if (interaction['case:interaction:uniqueName']) {
    return interaction['case:interaction:uniqueName'];
  }
  const stateNames = states.map((state) => state.stateName).join(' and ');
  const requestName =
    'case:matcher:uniqueName' in interaction.request
      ? interaction.request['case:matcher:uniqueName']
      : `Interaction ${index}'s request`;
  const responseName =
    'case:matcher:uniqueName' in interaction.response
      ? interaction.response['case:matcher:uniqueName']
      : `Interaction ${index}'s response`;

  return `${
    stateNames !== '' ? `When ${stateNames}, then ` : ''
  }${requestName} responds with ${responseName}`;
};
