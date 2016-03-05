/*
 * gulp default
 */

'use strict';

var gulp = require('gulp');

gulp.task('default', ['sass'], function () {
  gulp.watch('source/scss/**/*.scss', ['sass']);
  gulp.watch('source/js/**/*.js', ['js']);
});
