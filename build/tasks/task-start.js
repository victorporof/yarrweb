// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import url from 'url';

import gulp from 'gulp';
import yargs from 'yargs';
import opn from 'opn';
import delay from 'timeout-as-promise';

import logger from '../logger';
import { spawn } from '../../src/shared/util/spawn';
import * as Paths from '../../src/shared/paths';
import * as Endpoints from '../../src/shared/endpoints';
import * as ServerEndpoints from '../../src/server/constants/endpoints';

gulp.task('start', async () => {
  const args = [
    '--hostname', Endpoints.FRONTEND_SERVER_HOST,
    '--port', Endpoints.FRONTEND_SERVER_PORT,
  ];

  const FRONTEND_URL = url.format({
    protocol: 'http:',
    slashes: true,
    hostname: Endpoints.FRONTEND_SERVER_HOST,
    port: Endpoints.FRONTEND_SERVER_PORT,
    pathname: `${ServerEndpoints.API_VERSION}/${ServerEndpoints.FRONTEND_STATIC_PATH}`,
  });

  await Promise.all([
    spawn('node', Paths.PROJECT_SERVER_DST_MAIN, args, { logger }),
    delay(100).then(() => opn(FRONTEND_URL, { app: yargs.argv.browser })),
  ]);
});
