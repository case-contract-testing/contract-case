import packageJson from '../package.json' assert { type: 'json' };

export const versionString: string =
  packageJson.version != null
    ? `case-connector@${packageJson.version}`
    : 'UNKNOWN-VERSION';
