import * as crypto from 'crypto';
import { DownloadedContract } from '../../../core/types.broker';
import { ContractData } from '../../../entities/types';
import { stripForComparison } from './stripForComparison';

export const hashContract = (
  contract: ContractData | DownloadedContract,
): string =>
  crypto
    .createHash('sha256')
    .update(JSON.stringify(stripForComparison(contract)))
    .digest('hex');
