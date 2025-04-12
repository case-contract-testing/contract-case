import * as crypto from 'crypto';
import { DownloadedContract } from '../../../core/types.broker';
import { ContractData } from '../../../entities/types';

const extractData = (contract: ContractData | DownloadedContract) => {
  if ('_links' in contract) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _links, createdAt, metadata, ...contractWithoutBroker } = contract;
    return contractWithoutBroker;
  }
  const { metadata, ...stableContract } = contract;
  return stableContract;
};

export const hashContract = (
  contract: ContractData | DownloadedContract,
): string =>
  crypto
    .createHash('sha256')
    .update(JSON.stringify(extractData(contract)))
    .digest('hex');
