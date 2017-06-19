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

import unzip from 'lodash/unzip';
import compact from 'lodash/compact';
import isBrowser from 'is-browser';
import ansi from 'ansi-webkit';
import df from 'dateformat';
import _colors from 'colour';

_colors.mode = 'console';

_colors.setTheme({
  // Levels.
  log: 'gray',
  warn: ['yellow', 'bold'],
  error: ['red', 'bold'],

  // Misc.
  normal: 'gray',
  command: ['cyan', 'italic'],
  path: 'blue',
  arg: 'yellow',
  success: 'green',
  received: 'cyan',
  sent: 'blue',
  duration: 'magenta',
});

export default class Logger {
  constructor(name, writer, options = {}) {
    this._name = name;
    this._writer = writer;
    this._options = options;
  }

  log(...args) {
    this._write('log', ...args);
  }

  warn(...args) {
    this._write('warn', ...args);
  }

  error(...args) {
    this._write('error', ...args);
  }

  _write(level, ...args) {
    if (!this._options.always && process.env.LOGGING !== 'on') {
      return;
    }

    const messages = [
      _colors[level](df(Date.now(), '[HH:MM:ss]'), _colors.bold(this._name)),
      ...args,
    ];

    if (isBrowser) {
      const [rawStrings, cssStyles] = unzip(messages.map((formatted) => {
        const [raw, css] = ansi.parse(formatted);
        return [raw || formatted, css];
      }));
      this._writer[level](rawStrings.join(' '), ...compact(cssStyles));
    } else {
      this._writer[level](...messages);
    }
  }
}

export const colors = _colors;
