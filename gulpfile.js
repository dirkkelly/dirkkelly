'use strict';

const concat = require('gulp-concat');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const include = require('gulp-include');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
var log = require('fancy-log');

const env = process.env.HUGO_ENV;
const production = ['production','staging'].includes(env);
const destination = production ? 'public' : 'static';

gulp.task('scripts', function() {
  return gulp.src([
      './node_modules/popper.js/dist/umd/popper.js',
      './src/js/dirkkelly.js'
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

gulp.task('build', ['scripts'], function () {
});

gulp.task('serve', ['build'], function () {
  watch(['src/js/**/*'], function() { gulp.start('scripts'); });
});
