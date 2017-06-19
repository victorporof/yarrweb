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

import cp from 'child_process';

import colors from 'colour';

export const spawn = (command, main, args, { logger }, options = {}) => new Promise((resolve, reject) => {
  logger.log('Spawning',
    colors.command(command),
    colors.path(main),
    colors.arg(args.join(' ')));

  if (options.cwd) {
    logger.log(`Running in ${colors.command('cwd')} ${colors.path(options.cwd)}`);
  }

  const stdio = process.platform === 'win32'
    ? 'ignore'
    : 'inherit';

  const child = cp.spawn(command, [main, ...args], { stdio, ...options });

  child.on('error', (err) => {
    logger.error(err);
    reject(err);
  });

  child.on('exit', (code) => {
    logger.log(
      `Process ${colors.command(command)} ${colors.path(main)}`,
      `exited with code ${colors.arg(code)}`);

    resolve();
  });

  return child;
});
