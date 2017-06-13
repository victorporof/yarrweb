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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Styles from './app.css';
import * as RootSelectors from '../selectors/root-selectors';

@connect(state => ({
  helloWorldVisible: RootSelectors.getHelloWorldVisible(state),
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class App extends PureComponent {
  render() {
    return (
      <div styleName="app">
        <FontAwesome name="comment-o" />
        <span>
          {this.props.helloWorldVisible ? 'Hello World' : ''}
        </span>
      </div>
    );
  }
}

App.WrappedComponent.propTypes = {
  helloWorldVisible: PropTypes.bool.isRequired,
};
