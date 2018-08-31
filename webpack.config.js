const { CheckerPlugin } = require('awesome-typescript-loader');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: ['./src/index.ts']
  },
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.json'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@test': path.resolve(__dirname, 'test')
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          babelOptions: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  targets: {
                    node: "8.11.1"
                  }
                }
              ],
            ],
          },
          babelCore: '@babel/core'
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: "commonjs"
  },
  plugins: [
    new CheckerPlugin(),
    new CleanWebpackPlugin([
      path.resolve(__dirname, 'dist'),
    ])
  ]
};
