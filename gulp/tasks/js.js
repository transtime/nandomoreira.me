/*
 * gulp js
 */

var config = require('../config.json');
var $ = require('gulp-load-plugins')();
var gulp = require('gulp');

var jsfiles = [ config.js + '*.js' ];

gulp.task('lint', function () {
  return gulp.src(jsfiles)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default', { verbose: true }));
})

.task('js', function () {
  gulp.src(jsfiles)
    .pipe($.plumber())
    .pipe($.include()).on('error', console.log)
    .pipe($.uglify())
    .pipe($.size({ title: 'Scripts', gzip: false, showFiles: true }))
    .pipe(gulp.dest(config.dest.js))
    .pipe($.plumber.stop());
});
