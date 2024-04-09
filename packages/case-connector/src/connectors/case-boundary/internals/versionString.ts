import * as readPackage from 'read-pkg-up';

const pkg = readPackage.sync({ cwd: __dirname }) || {
  packageJson: {
    name: __dirname,
    version: 'unknown',
  },
};

export const versionString = `${pkg.packageJson.name}@${
  pkg.packageJson.version || 'UNKNOWN-VERSION'
}`.replace('@contract-case/', '');
