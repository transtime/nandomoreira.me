/*
 * gulp sass
 */
'use strict';

var bourbon = require('node-bourbon'),
       gulp = require('gulp'),
          $ = require('gulp-load-plugins')();

var dest = 'source/jekyll/assets/css';

gulp.task('sass', function () {
  return $.rubySass('source/scss/*.scss', {
      sourcemap: true,
      loadPath: bourbon.includePaths
    })
    .on('error', $.rubySass.logError)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.cssnano({ processImport: true }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(dest))
    .pipe($.plumber.stop());
});
