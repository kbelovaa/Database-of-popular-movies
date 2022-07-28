'use strict';
 
var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');

sass.compiler = require('sass');
 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});
 
gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.watch(['./sass/**/*.scss', './js/**/*.js'], gulp.parallel(['sass', 'scripts']));
});

gulp.task('default', gulp.series(['watch']));