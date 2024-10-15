import packageJson from '../package.json';

export const versionString: string =
  packageJson.version != null
    ? `case-connector@${packageJson.version}`
    : 'UNKNOWN-VERSION';
