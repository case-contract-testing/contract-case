const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { version } = require('./package.json');

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: {
    caseconnector: {
      import: './dist/bin/case-connector.mjs',
      filename: 'case-connector.js',
    },
  },
  output: {
    path: path.join(__dirname, '/package'),
    iife: false,
  },
  devtool: 'source-map',
  target: 'node18',
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: {
          banner: (licenseFile) =>
            `ContractCase Connector v${version}. License information can be found in ${licenseFile}`,
        },
      }),
    ],
  },
};
