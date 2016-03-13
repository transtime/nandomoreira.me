/*
 * gulp js
 */

var gulp = require('gulp'),
       $ = require('gulp-load-plugins')();

gulp.task('js', function () {
  gulp.src([ 'source/js/main.js' ])
    .pipe($.plumber())
    .pipe($.include()).on('error', console.log)
    .pipe($.size({ title: "Default file" }))
    .pipe($.uglify())
    .pipe($.size({ title: "After uglify" }))
    .pipe(gulp.dest('source/jekyll/assets/js'))
    .pipe($.plumber.stop());
});
