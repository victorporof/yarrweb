// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import gulp from 'gulp';
import del from 'del';

import logger from '../logger';
import { colors } from '../../src/shared/util/logger';
import * as Paths from '../../src/shared/paths';

gulp.task('clean:lib', () => {
  logger.log(`Running ${colors.command('rm')} ${colors.path(Paths.LIB_DIR)}`);
  return del([Paths.LIB_DIR]);
});

gulp.task('clean', gulp.series(
  'clean:lib',
));
