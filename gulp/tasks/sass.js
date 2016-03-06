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
    .pipe($.autoprefixer({
      browsers: [
        "ie >= 10",
        "ie_mob >= 10",
        "ff >= 30",
        "chrome >= 34",
        "safari >= 7",
        "opera >= 23",
        "ios >= 7",
        "android >= 4.4",
        "bb >= 10"
      ],
      cascade: false
    }))
    .pipe($.cssnano({ processImport: true }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(dest))
    .pipe($.plumber.stop());
});
