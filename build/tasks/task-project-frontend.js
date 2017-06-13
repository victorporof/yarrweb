// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import gulp from 'gulp';
import debug from 'gulp-debug';
import changed from 'gulp-changed';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import logger from '../logger';
import { colors } from '../../src/shared/util/logger';
import * as Paths from '../../src/shared/paths';
import * as Endpoints from '../../src/shared/endpoints';
import prodConfig from '../webpack/config.project-frontend.prod';
import devConfig from '../webpack/config.project-frontend.dev';

const WEBPACK_STATS_OPTIONS = {
  colors: true,
  warnings: false,
};

let gWebpackDevServer;

gulp.task('project-frontend:copy-fixtures', () =>
  gulp.src(`${Paths.PROJECT_FRONTEND_SRC}/**/*.html`)
    .pipe(changed(Paths.PROJECT_FRONTEND_DST))
    .pipe(debug({ title: `Running ${colors.command('cp')}` }))
    .pipe(gulp.dest(Paths.PROJECT_FRONTEND_DST)));

gulp.task('project-frontend:webpack', () => new Promise((resolve, reject) => {
  if (process.env.NODE_ENV !== 'development') {
    // In a production environment, webpack directly to disk.
    webpack(prodConfig, (err, stats) => {
      if (err) { reject(err); return; }
      if (stats) { logger.log(stats.toString(WEBPACK_STATS_OPTIONS)); }
      resolve();
    });
  } else {
    // In a development environment, webpack in memory and serve.
    const compiler = webpack(devConfig);
    const server = new WebpackDevServer(compiler, {
      ...devConfig.devServer,
      stats: WEBPACK_STATS_OPTIONS,
    });

    // We'll have to close the webpack dev server later, so store it as a global.
    // If we leave the server open, the build process will keep running forever.
    gWebpackDevServer = server;

    server.listen(
      Endpoints.WEBPACK_DEV_SERVER_PORT,
      Endpoints.WEBPACK_DEV_SERVER_HOST, resolve);
  }
}));

gulp.task('project-frontend:build', gulp.series(
  'project-frontend:copy-fixtures',
  'project-frontend:webpack',
));

gulp.task('project-frontend:build:cleanup', (cb) => {
  if (process.env.NODE_ENV !== 'development') {
    // In a production environment, we've webpacked directly to disk.
    cb();
  } else {
    // In a development environment, we're webpacking in memory and serving.
    gWebpackDevServer.close(cb);
    gWebpackDevServer = null;
  }
});
