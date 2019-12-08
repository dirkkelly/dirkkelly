'use strict';

const concat = require('gulp-concat');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const include = require('gulp-include');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const env = process.env.HUGO_ENV;
const production = ['production','staging'].includes(env);
const destination = production ? 'public' : 'static';

sass.compiler = require('node-sass');

gulp.task('scripts', function() {
  return gulp.src([
      './node_modules/popper.js/dist/umd/popper.js',
      './src/js/*.js'
    ])
    .pipe(include({
      includePaths: [
        './node_modules/bootstrap/dist/js',
        './node_modules/jquery/dist'
      ]
    }))
    .pipe(gulpif(production, uglify()))
    .pipe(gulp.dest('./' + destination + '/js'));
});

gulp.task('styles', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulpif(!production, sourcemaps.write('./maps')))
    .pipe(gulp.dest('./' + destination + '/css'));
});

gulp.task('build', ['scripts', 'styles'], function () {
});

gulp.task('serve', ['build'], function () {
  watch(['src/js/**/*','src/scss/**/*'], function() {
    gulp.start('build');
  });
});
