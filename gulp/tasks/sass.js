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
    .pipe($.size({ title: "Default file" }))
    .pipe($.combineMq())
    .pipe($.size({ title: "After combineMq" }))
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
    .pipe($.size({ title: "After autoprefixer" }))
    .pipe($.cssnano({ processImport: true }))
    .pipe($.size({ title: "After cssnano" }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(dest))
    .pipe($.plumber.stop());
});
