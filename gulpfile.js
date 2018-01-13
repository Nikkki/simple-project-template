var gulp = require('gulp'),
  sass = require('gulp-sass'),
  connect = require('gulp-connect'),
  livereload = require('gulp-livereload'),
  browserify = require('gulp-browserify'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps');
// fileinclude = require('gulp-file-include');

// html includes
// gulp.task('gulp_file_include', function () {
//   gulp.src('public/**/*.html')
//       .pipe(fileinclude({
//         prefix: '@@',
//         basepath: '@file'
//       }))
//       .pipe(gulp.dest('dist'));
// });

//sass
gulp.task('sass-dev', function () {
  gulp.src('public/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/styles'))
    .pipe(connect.reload());
});

gulp.task('sass-prod', function () {
  gulp.src('public/styles/**/*.scss')
  .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
  .pipe(gulp.dest('dist/styles'));
});


/* connect */
gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 1337
  });
});

/*html*/
gulp.task('html', function () {
  gulp.src('dist/index.html')
    .pipe(connect.reload());
});

/*browserify*/
gulp.task('browserify-dev', function () {
  return gulp.src('./public/js/index.js')
    // .pipe(rename('index.js'))
    .pipe(browserify({ debug: true }))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});
gulp.task('browserify-prod', function () {
  return gulp.src('./public/js/index.js')
    // .pipe(rename('index.js'))
    .pipe(browserify({ debug: false }))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});



gulp.task('watch', function () {
  gulp.watch(['./dist/index.html'], ['html']);
  gulp.watch('./public/js/**/*.js', ['browserify']);
  gulp.watch(['./public/styles/**/*.scss'], ['css', 'sass']);
});

// For development
gulp.task('dev', ['connect', 'html', 'sass-dev', 'browserify-dev', 'watch']);

// Production
gulp.task('build', ['sass-prod', 'browserify-prod']);