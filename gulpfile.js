'use strict';

const concat = require('gulp-concat');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const include = require('gulp-include');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const watch = require('gulp-watch');

sass.compiler = require('node-sass');

const env = process.env.HUGO_ENV;
const production = ['production','staging'].includes(env);
const destination = production ? 'public' : 'static';

gulp.task('scripts', function() {
  return gulp.src([
      // including Popper.js fixes Bootstrap issues
      // https://github.com/twbs/bootstrap/issues/23381
      './node_modules/popper.js/dist/umd/popper.js',
      './src/js/*.js'
    ])
    .pipe(include({
      includePaths: [
        './node_modules/bootstrap/dist/js',
        './node_modules/jquery/dist'
      ]
    }))
    .pipe(gulpif(production, terser().on('error', console.error)))
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
