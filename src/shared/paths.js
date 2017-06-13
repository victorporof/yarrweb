// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';

import yargs from 'yargs';
import { IS_LOCAL_BUILD, NOT_RUNNING_IN_BUILD } from './build-info';

/**
 * Top-level root directory, where all paths originate from.
 * Differs based on whether this is a local build, running tests etc.
 */
export const ROOT_DIR = path.resolve((() => {
  if (IS_LOCAL_BUILD) {
    return path.join(__dirname, '..', '..', '..');
  }
  if (NOT_RUNNING_IN_BUILD) { // e.g. gulp tasks, mocha tests etc.
    return path.join(__dirname, '..', '..');
  }
  throw new Error('Unknown runtime.');
})());

/**
 * Main high-level source code directories.
 */
export const SRC_DIR = path.join(ROOT_DIR, 'src');
export const LIB_DIR = path.join(ROOT_DIR, 'lib');
export const DIST_DIR = path.join(ROOT_DIR, 'dist');
export const BUILD_SCRIPTS_DIR = path.join(ROOT_DIR, 'build');

/**
 * Build destination ("resources") directory name.
 * Differs based on whether this is a local build, running tests etc.
 */
export const OBJ_DIR_NAME = (() => {
  if (IS_LOCAL_BUILD) {
    return path.basename(path.join(__dirname, '..'));
  }
  if (NOT_RUNNING_IN_BUILD) { // e.g. gulp tasks, mocha tests etc.
    return yargs.argv.objDirName || 'obj';
  }
  throw new Error('Unknown runtime.');
})();

/**
 * Build destination ("resources") directory path.
 */
export const RESOURCES_DIR = path.join(LIB_DIR, OBJ_DIR_NAME);

/**
 * Shared code paths.
 */
export const PROJECT_SHARED_DIRNAME = 'shared';
export const PROJECT_SHARED_SRC = path.join(SRC_DIR, PROJECT_SHARED_DIRNAME);
export const PROJECT_SHARED_DST = path.join(RESOURCES_DIR, PROJECT_SHARED_DIRNAME);

/**
 * Frontend code paths.
 */
export const PROJECT_FRONTEND_DIRNAME = 'frontend';
export const PROJECT_FRONTEND_SRC = path.join(SRC_DIR, PROJECT_FRONTEND_DIRNAME);
export const PROJECT_FRONTEND_DST = path.join(RESOURCES_DIR, PROJECT_FRONTEND_DIRNAME);

export const PROJECT_FRONTEND_ENTRY_FILENAME = 'index.js';
export const PROJECT_FRONTEND_BUNDLED_FILENAME = 'index.js';
export const PROJECT_FRONTEND_DST_MAIN = path.join(PROJECT_FRONTEND_DST, PROJECT_FRONTEND_BUNDLED_FILENAME);

/**
 * Server code paths.
 */
export const PROJECT_SERVER_DIRNAME = 'server';
export const PROJECT_SERVER_SRC = path.join(SRC_DIR, PROJECT_SERVER_DIRNAME);
export const PROJECT_SERVER_DST = path.join(RESOURCES_DIR, PROJECT_SERVER_DIRNAME);

export const PROJECT_SERVER_ENTRY_FILENAME = 'index.js';
export const PROJECT_SERVER_DST_MAIN = path.join(PROJECT_SERVER_DST, PROJECT_SERVER_ENTRY_FILENAME);
