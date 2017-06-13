/*
Copyright 2016 Mozilla

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
*/

import express from 'express';
import proxy from 'express-http-proxy';

import * as Paths from '../../shared/paths';
import * as Endpoints from '../../shared/endpoints';

export default ({ pathname, app }) => {
  const router = express.Router();
  app.use(pathname, router);

  // In development builds, we want to reroute script bundle requests to the
  // webpack dev server, which incrementally rebuilds the project's frontend,
  // in memory, when sources change.
  if (process.env.NODE_ENV === 'development') {
    const frontendBundle = Paths.PROJECT_FRONTEND_BUNDLED_FILENAME;
    const webpackDevServer = `${Endpoints.WEBPACK_DEV_SERVER_HOST}:${Endpoints.WEBPACK_DEV_SERVER_PORT}`;
    router.get(`/${frontendBundle}`, proxy(webpackDevServer));
    router.get('/hot-module-reload/:resource', proxy(webpackDevServer, {
      forwardPath: req => `/${req.params.resource}`,
    }));
  }

  router.use(express.static(Paths.PROJECT_FRONTEND_DST));
};
