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

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import App from './views/app';
import ExampleEffects from './actions/effects/example-effects';

export const setupFrontend = (store, document, selector) => {
  const container = document.querySelector(selector);
  const app = (
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>
  );
  ReactDOM.render(app, container);
};

export const setupInitialState = (store) => {
  store.dispatch(ExampleEffects.sayHelloWorld());
};
