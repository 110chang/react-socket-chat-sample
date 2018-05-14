//gulpfile.js

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var browsersync = require('browser-sync');

gulp.task('concat', function() {
  browserify({
    entries: ['./src/index.js'],
    debug : !gulp.env.production
  }).transform(babelify, { presets: ['react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(browsersync.stream());
});

gulp.task('default', ['concat'], function() {
  gulp.watch("./src/**/*.js", ['concat']);
});
