// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

// Paths
const SRC = 'assets';
const DEST = 'dist';

const STYLES_SRC = SRC + '/stylesheets';
const STYLES_DEST = DEST + '/stylesheets';

const JAVASCRIPT_SRC = SRC + '/javascript';
const JAVASCRIPT_DEST = DEST + '/javascript';

const IMAGE_SRC = SRC + '/images';
const IMAGE_DEST = DEST + '/images';

const S3_IMAGE_SRC = SRC + '/remote-images';
const S3_IMAGE_DEST = DEST + '/remote-images';

const HTML_SRC = SRC;
const HTML_DEST = DEST;

const CNAME_SRC = './';
const CNAME_DEST = DEST;

const ROOT = DEST;

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
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
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

// Optimize images and move to dist
gulp.task('images', function () {
  return gulp.src(IMAGE_SRC + '/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest(IMAGE_DEST));
});

// Optimize S3 images
gulp.task('images:s3', function () {
  return gulp.src(`${S3_IMAGE_SRC}/**/*.*`)
    .pipe(imagemin())
    .pipe(gulp.dest(S3_IMAGE_DEST));
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
