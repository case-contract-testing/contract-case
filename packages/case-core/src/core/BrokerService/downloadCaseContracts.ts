import { DataContext } from '@contract-case/case-plugin-base';
import { ContractLink, BrokerApi, DownloadedContract } from '../types.broker';

type ContractRef = {
  contractData: DownloadedContract;
  name: string;
};

const downloadContractsFromUrls = (
  contractUrls: ContractLink[],
  broker: BrokerApi,
  context: DataContext,
): Promise<ContractRef[]> =>
  Promise.all(
    contractUrls.map((contractUrl) => {
      context.logger.debug(
        `Downloading contract for '${contractUrl.name}' from ${contractUrl.href}`,
      );
      return broker
        .downloadContract(contractUrl.href, context)
        .then((contractData) => ({
          contractData,
          name: contractUrl.name,
        }));
    }),
  );

const filterNonCaseContracts = (
  contracts: ContractRef[],
  context: DataContext,
) => {
  const nonCaseContracts = contracts.filter(
    (c) =>
      !(
        'contractType' in c.contractData &&
        c.contractData.contractType === 'case::contract'
      ),
  );

  nonCaseContracts.forEach((c) => {
    context.logger.debug(
      `Skipping contract '${c.name}' as it does not appear to be a ContractCase Contract`,
    );
  });
  return nonCaseContracts;
};

export const downloadCaseContracts = async (
  contractUrls: ContractLink[],
  broker: BrokerApi,
  context: DataContext,
): Promise<ContractRef[]> => {
  const contracts = await downloadContractsFromUrls(
    contractUrls,
    broker,
    context,
  );

  const nonCaseContracts = filterNonCaseContracts(contracts, context);

  const caseContracts = contracts.filter(
    (c) =>
      'contractType' in c.contractData &&
      c.contractData.contractType === 'case::contract',
  );

  if (caseContracts.length === 0) {
    context.logger.warn(
      `No ContractCase contracts to verify. There were ${nonCaseContracts.length} non-case contracts.`,
    );
    context.logger.warn(
      'You can see more information by re-running this task with logLevel: debug or lower',
    );
  }

  return caseContracts;
};
