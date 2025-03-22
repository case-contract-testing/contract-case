import packageJson from '../package.json' with { type: 'json' };

export const versionString: string =
  packageJson.version != null
    ? `case-connector@${packageJson.version}`
    : 'UNKNOWN-VERSION';
