'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat'); 
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var watch = require('gulp-watch');
 
gulp.task('sass', function () {
  return gulp.src('./scss/site.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('js:watch', function () {
  gulp.watch('./js/*.js', ['scripts']);
});

gulp.task('watch', function () {
  gulp.watch('./scss/*.scss', ['minify']);
  gulp.watch('./js/*.js', ['minify']);
});

gulp.task('minify:js', ['scripts'], function() {
  gulp.src('./dist/all.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('minify:css', ['sass'], function() {
  return gulp.src('./dist/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('site.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return gulp.src('./dist/*')
    .pipe(vinylPaths(del));
});

//concat javascript files
gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

// minify js and css
gulp.task('minify', function () {
  runSequence('minify:css', 'minify:js');
});

// Default task
gulp.task('default', function () {
  runSequence('clean', 'sass', 'minify');
});


