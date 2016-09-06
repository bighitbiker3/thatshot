var gulp = require('gulp');
var webpack = require('gulp-webpack');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var concat = require('gulp-concat');

gulp.task('webpackDatAss', function() {
  return gulp.src('front/src/entry.js')
    .pipe(webpack(require('./webpack.config.js')))
    .on('error', (err) => console.log(err))
    .pipe(gulp.dest('dist/'));
});


gulp.task('sass', function () {
  return gulp.src('./front/sass/*.scss')
    .pipe(plumber({
        errorHandler: notify.onError('SASS processing failed! Check your gulp process.')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('all.scss'))
    .pipe(sourcemaps.write())
    .pipe(rename('style.css'))
    .on('error', (err) => console.log(err))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./front/sass/*.scss', ['sass']);
});
gulp.task('js:watch', function () {
  gulp.watch('./front/src/**/*.js', ['webpackDatAss']);
});

gulp.task('default', ['webpackDatAss', 'sass', 'sass:watch', 'js:watch']);
