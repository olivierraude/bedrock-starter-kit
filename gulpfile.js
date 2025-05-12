/**
 * 
 *  BASE GULPFILE
 * 
 */

// require gulp
  source = "web/app/themes/your_theme_name/";
  proxy = "http://localhost/your_file_name/web/";
  
  
  // const {src,dest,watch,series} = require("gulp");
  const gulp = require('gulp');
  const sass = require('gulp-sass')(require('sass'));
  const sourcemaps = require('gulp-sourcemaps');
  const plumber = require('gulp-plumber');
  const postcss = require('gulp-postcss');
  const autoprefixer = require('autoprefixer');
  const cleanCSS = require('gulp-clean-css');
  const rename = require('gulp-rename');
  const uglify = require('gulp-uglify');
  const browserSync = require("browser-sync").create();
  
  // Tâche SCSS
  function scssTask() {
    return gulp.src(source + 'sass/**/*scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass.sync().on('error', sass.logError))
      // .pipe(postcss([autoprefixer({cascade: false})]))
      .pipe(postcss([autoprefixer()]))
      .pipe(gulp.dest(source + 'sass')) // ← adapte ce chemin
      .pipe(cleanCSS({ compatibility: 'ie11' }))
      .pipe(rename({ suffix: ".min" }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(source + 'dist/css')); // ← adapte ce chemin
  }

// Script Task
function scriptTask() {
  return gulp.src(source + "js/**/*.js", { sourcemaps: true })
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(source + "dist/js"));
};

// Images Task

// Browsersync Tasks
function browsersyncServe(cb) {
  browserSync.init({
    proxy: proxy,
  });
  cb();
}

function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

// Watch Task
function watchTask() {
  gulp.watch(source + "**/*php", browsersyncReload);
  gulp.watch(
    [source + "sass/**/*scss", source + "js/*js"],
    gulp.series(scssTask, scriptTask, browsersyncReload)
  );
}

// Default Gulp Task
exports.default = gulp.series(
  scssTask,
  scriptTask,
  browsersyncServe,
  watchTask
)