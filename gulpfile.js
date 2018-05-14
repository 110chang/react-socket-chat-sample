//gulpfile.js

var gulp = require('gulp');
var gls = require('gulp-live-server');
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

gulp.task('server', function() {
  gls.new('./index.js').start();

  //browsersync.init({
  //  proxy: 'http://192.168.3.3:3000/',
  //  //files: ['./dest/**/*.*'],
  //  port: 3333,
  //  open: false,
  //  //logLevel: 'debug'
  //});
});

// Watch
gulp.task('default', ['server'], function() {
  gulp.watch("./src/**/*.js", ['concat']);
});
