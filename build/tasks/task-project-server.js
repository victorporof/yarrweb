// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import gulp from 'gulp';
import debug from 'gulp-debug';
import changed from 'gulp-changed';
import babel from 'gulp-babel';
import insert from 'gulp-insert';
import sourcemaps from 'gulp-sourcemaps';
import fs from 'fs-promise';

import { colors } from '../../src/shared/util/logger';
import * as Paths from '../../src/shared/paths';

gulp.task('project-server:babel', () =>
  gulp.src(`${Paths.PROJECT_SERVER_SRC}/**/*.@(js|jsx)`)
    .pipe(changed(Paths.PROJECT_SERVER_DST, { extension: '.js' }))
    .pipe(debug({ title: `Running ${colors.command('babel')}` }))
    .pipe(sourcemaps.init())
    .pipe(insert.prepend('const IS_BUILD = true;\n'))
    .pipe(babel(fs.readJsonSync('.babelrc')))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(Paths.PROJECT_SERVER_DST)));

gulp.task('project-server:build', gulp.series(
  'project-server:babel',
));

gulp.task('project-server:build:cleanup', () => {
  // Nothing to do here yet.
});
