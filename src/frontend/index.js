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

/* global module */

import throttle from 'lodash/throttle';

import './css/global.css';
import './css/theme.css';

import { setupFrontend, setupInitialState } from './setup';
import { configureStore } from '../shared/store/configure';
import RootReducer from './reducers/root-reducer';
import RootSaga from './sagas/root-saga';

const store = configureStore({
  reducers: RootReducer,
  sagas: RootSaga,
  throttle: fn => throttle(fn, 1),
});

setupFrontend(store, document, '.container');
setupInitialState(store);

if (module.hot) {
  module.hot.accept('./views/app', () => setupFrontend());
}
