const path = require('path');

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: {
    caseconnector: {
      import: './dist/bin/case-connector.js',
      filename: 'case-connector.js',
    },
  },
  output: {
    path: path.join(__dirname, '/webpack'),
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
};
