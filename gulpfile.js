// Include gulp
var gulp = require('gulp');


// Include Our Plugins
var sass = require('gulp-sass'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify'),
  sourcemaps = require('gulp-sourcemaps');

// Paths
var SRC = 'assets';
var DEST = 'dist';

var STYLES_SRC = SRC + '/stylesheets';
var STYLES_DEST = DEST + '/stylesheets';

var JAVASCRIPT_SRC = SRC + '/javascript';
var JAVASCRIPT_DEST = DEST + '/javascript';

var IMAGE_SRC = SRC + '/images';
var IMAGE_DEST = DEST + '/images';

var HTML_SRC = SRC;
var HTML_DEST = DEST;

var CNAME_SRC = './';
var CNAME_DEST = DEST;

var ROOT = DEST;

// Tasks
// ----------------------------------------

// Lint Task
gulp.task('lint', function() {
  return gulp.src(JAVASCRIPT_SRC + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile and Source Map our Sass
gulp.task('dev:scss', function() {
  return gulp.src(STYLES_SRC + '/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', notify.onError({
      title: 'Sass Compile Error',
      sound: 'Basso'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(STYLES_DEST));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  gulp.src(JAVASCRIPT_SRC + '/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(JAVASCRIPT_DEST));
});

// Move Images to Dist
gulp.task('images', function () {
  gulp.src(IMAGE_SRC + '/**/*.*')
    .pipe(gulp.dest(IMAGE_DEST));
});

// Refresh when HTML changes
gulp.task('html', function () {
  gulp.src(HTML_SRC + '/**/*.html')
    .pipe(gulp.dest(HTML_DEST));
});

gulp.task('domain-config', function() {
  gulp.src(CNAME_SRC + '/' + 'CNAME')
    .pipe(gulp.dest(CNAME_DEST + '/'));
});

// Watch files for changes
gulp.task('watch', function () {

  // Watch .html files
  gulp.watch([HTML_SRC + '/**/*.html'], ['html']);

  // Watch .scss files
  gulp.watch([STYLES_SRC + '/**/*.scss'], ['dev:scss']);

  // Watch .js files
  gulp.watch([JAVASCRIPT_SRC + '/**/*.js'], ['scripts']);

  // Watch image directory
  gulp.watch([IMAGE_SRC + '/**/*.*'], ['images']);

});


// Default Task
gulp.task('default', ['html', 'dev:scss', 'scripts', 'watch', 'images', 'domain-config']);
