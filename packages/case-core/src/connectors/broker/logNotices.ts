import { CaseCoreError, LogContext } from '@contract-case/case-plugin-base';
import { WireNotice } from './brokerDto.types';

export const logNotices = (
  notices: WireNotice[],
  context: LogContext,
): void => {
  context.logger.maintainerDebug('Logging notices', notices);
  notices.forEach((notice) => {
    switch (notice.type) {
      case 'debug':
        context.logger.debug(`[From Broker] ${notice.text}`);
        break;
      case 'info':
        context.logger.debug(`[From Broker] ${notice.text}`);
        break;
      case 'prompt':
        context.logger.warn(`[From Broker] ${notice.text}`);
        break;
      case 'success':
        context.logger.debug(`[From Broker] ${notice.text}`);
        break;
      case 'error':
        context.logger.error(`[From Broker] ${notice.text}`);
        break;
      case 'danger':
        context.logger.error(`[From Broker] [DANGER] ${notice.text}`);
        break;
      case 'warning':
        context.logger.warn(`[From Broker] ${notice.text}`);
        break;
      default:
        throw new CaseCoreError(
          `The broker returned a log level ('${
            notice.type
          }') that Case doesn't know how to handle.\n\nThe problem is in the following notice object:\n\n${JSON.stringify(
            notice,
          )}`,
        );
    }
  });
};
