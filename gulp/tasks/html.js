/*
 * gulp minify html
 */

var gulp = require('gulp'),
       $ = require('gulp-load-plugins')();

gulp.task('html', function () {
  gulp.src([ '_site/**/*.html' ])
    .pipe($.plumber())
    .pipe($.size({ title: "Default files" }))
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe($.size({ title: "After htmlmin" }))
    .pipe(gulp.dest('htmlmin'))
    .pipe($.plumber.stop());
});
