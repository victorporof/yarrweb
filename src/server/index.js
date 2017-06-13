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

import http from 'http';

import express from 'express';
import morgan from 'morgan';
import colors from 'colour';

import logger from './logger';

import * as Endpoints from './constants/endpoints';
import setupFrontendRoute from './routes/frontend';

const app = express();
const server = http.Server(app);

app.use(morgan('dev', {
  skip: () => process.env.LOGGING !== 'on',
}));

setupFrontendRoute({ pathname: `/${Endpoints.API_VERSION}/${Endpoints.FRONTEND_STATIC_PATH}`, app });

server.listen(Endpoints.PORT, Endpoints.HOSTNAME, () => {
  logger.log(
    colors.success('Server ready'),
    colors.normal(`hosting at ${Endpoints.HOSTNAME}`),
    colors.normal(`listening on port ${Endpoints.PORT}.`));
});
