import packageJson from '../../package.json' assert { type: 'json' };

export const versionString = `${packageJson.name}@${
  packageJson.version || 'UNKNOWN-VERSION'
}`.replace('@contract-case/', '');
