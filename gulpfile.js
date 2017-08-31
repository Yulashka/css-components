'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var watch = require('gulp-watch');
 
gulp.task('sass', function () {
  return gulp.src('./scss/site.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('minify', function() {
  return gulp.src('./css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('clean', function () {
  return gulp.src('./css/*')
    .pipe(vinylPaths(del));
});

// Default task
gulp.task('default', function () {
  runSequence('clean', 'sass', 'minify');
});
