// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import webpack from 'webpack';
import InlineEnviromentVariablesPlugin from 'inline-environment-variables-webpack-plugin';

export default {
  entry: [],
  output: {},
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }, {
        loader: 'webpack-module-hot-accept',
      }],
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]-[hash:base64:5]',
        },
      }],
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
      }],
    }],
    exprContextCritical: false,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_BUILD: true,
    }),
    new InlineEnviromentVariablesPlugin([
      'NODE_ENV',
      'LOGGING',
    ], {
      warnings: false,
    }),
  ],
};
