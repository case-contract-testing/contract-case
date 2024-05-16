import packageJson from '../package.json';

export const versionString: string =
  packageJson.name != null && packageJson.version != null
    ? `${packageJson.name}@${packageJson.version}`
    : 'UNKNOWN-VERSION';
