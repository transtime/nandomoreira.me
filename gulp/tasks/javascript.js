/*
 * gulp js
 */

// var config = require('../config.json');
var $ = require('gulp-load-plugins')();
var gulp = require('gulp');

gulp.task('js', function () {
  gulp.src([ 'source/js/main.js' ])
    .pipe($.plumber())
    .pipe($.include()).on('error', console.log)
    .pipe($.uglify())
    .pipe(gulp.dest('source/jekyll/assets/js'))
    .pipe($.plumber.stop());
});
