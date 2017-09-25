var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var fs = require('fs');
var webpack = require('webpack-stream');
// var browserify = require('browserify');
// var browserify = require('gulp-browserify');
// var vueify = require('gulp-vueify');

gulp.task('css', function () {
  return gulp.src('./src/css/**/*.scss')
    .pipe(sass({
      // includePaths: require('node-reset-scss').includePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./html/css'))
    .pipe(browserSync.stream({stream: true}));
});

gulp.task('css:watch', function () {
  return gulp.watch('./src/css/**/*.scss', gulp.series('css'));
});


gulp.task('browser-sync', function() {
    browserSync.init({
      proxy: "mn.dev",
      notify: true
    });
});


gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('html/js/'))
    .pipe(browserSync.stream({stream: true}));
});

gulp.task('vueify', function () {
  return gulp.src('src/js/**/*.vue')
    .pipe(vueify())
    .pipe(gulp.dest('html/js/'));
});

gulp.task('js:watch', function () {
  return gulp.watch('./src/js/*.js', gulp.series('js'));
});

gulp.task('default', gulp.parallel('browser-sync', 'css', 'css:watch', 'js', 'js:watch'));