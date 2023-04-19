import chalk from 'chalk';
import { Console } from 'node:console';
import { Printer } from '../connectors/logger/types';
import { LogLevel } from '../entities/types';

const stdoutLogger = new Console({ stdout: process.stdout });

export const defaultPrinter: Printer = {
  log: (
    level: LogLevel,
    timestamp: string,
    version: string,
    typeString: string,
    location: string,
    message: string,
    additional: string
  ) => {
    let typeColour = chalk.redBright;
    let messageColour = chalk.white;
    if (level === 'warn') {
      typeColour = chalk.yellowBright;
      messageColour = chalk.yellowBright;
    }
    if (level === 'error') {
      typeColour = chalk.redBright;
      messageColour = chalk.redBright;
    }
    if (level === 'debug') {
      typeColour = chalk.cyan;
      messageColour = chalk.cyan;
    }

    if (level === 'maintainerDebug') {
      typeColour = chalk.bgMagentaBright.black;
      messageColour = chalk.magentaBright;
    }

    if (level === 'deepMaintainerDebug') {
      typeColour = chalk.bgBlueBright.black;
      messageColour = chalk.blueBright;
    }

    stdoutLogger.log(
      `${timestamp} ${chalk.whiteBright(version)} ${typeColour(
        typeString
      )} ${chalk.blueBright(location)}: ${messageColour(message)}${
        additional !== '' ? `\n${messageColour(additional)}` : ''
      }`
    );
  },
};
