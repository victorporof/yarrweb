// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import gulp from 'gulp';

gulp.task('build', gulp.series(
  'project-shared:build',
  'project-server:build',
  'project-frontend:build',
));

gulp.task('build:cleanup', gulp.series(
  'project-shared:build:cleanup',
  'project-server:build:cleanup',
  'project-frontend:build:cleanup',
));

gulp.task('build+start', gulp.series(
  'build',
  'start',
  'build:cleanup',
));
