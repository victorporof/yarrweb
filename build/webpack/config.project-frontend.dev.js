// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import webpack from 'webpack';

import * as Paths from '../../src/shared/paths';
import * as ServerEndpoints from '../../src/server/constants/endpoints';
import { WEBPACK_DEV_SERVER_HOST, WEBPACK_DEV_SERVER_PORT } from '../../src/shared/endpoints';
import baseDevConfig from './config.default-dev';

export default {
  ...baseDevConfig,
  context: Paths.PROJECT_FRONTEND_SRC,
  entry: [
    ...baseDevConfig.entry,
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${WEBPACK_DEV_SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}`,
    'webpack/hot/only-dev-server',
    'font-awesome-webpack',
    `./${Paths.PROJECT_FRONTEND_ENTRY_FILENAME}`,
  ],
  output: {
    ...baseDevConfig.output,
    path: Paths.PROJECT_FRONTEND_DST,
    filename: Paths.PROJECT_FRONTEND_BUNDLED_FILENAME,
    publicPath: `/${ServerEndpoints.API_VERSION}/${ServerEndpoints.FRONTEND_STATIC_PATH}/hot-module-reload/`,
  },
  plugins: [
    ...baseDevConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    publicPath: '/',
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
