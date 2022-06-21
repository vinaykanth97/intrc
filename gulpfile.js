// VARIABLES & PATHS

let preprocessor = "scss", // Preprocessor
  fileswatch = "html,htm,txt,json,md,woff2", // List of files extensions for watching & hard reload (comma separated)
  imageswatch = "jpg,jpeg,png,webp,svg", // List of images extensions for watching & compression (comma separated)
  baseDir = "src", // Base directory path without «/» at the end
  outputDir = "dist", // Base directory path without «/» at the end
  online = true; // If «false» - Browsersync will work offline without internet connection

let paths = {
  lib_scripts: {
    src: [""], //Use this if plugin need to be concatnated
    dest: outputDir + "/js",
  },

  lib_styles: {
    src: [
      //'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
    ],
    dest: outputDir + "/css",
  },

  app_scripts: {
    src: [
      baseDir + "/js/**/*", // app.js. Always at the end
    ],
    dest: outputDir + "/js",
  },

  app_styles: {
    src: baseDir + "/" + preprocessor + "/style.*",
    dest: outputDir + "/css",
  },

  images_optimized: {
    src: baseDir + "/images/**/*",
    dest: outputDir + "/images/",
  },

  html_files: {
    src: baseDir + "/*.html",
    dest: outputDir + "/",
  },

  php_files: {
    src: baseDir + "/**/*.php",
    dest: outputDir + "/",
  },

  fonts: {
    src: baseDir + "/fonts/**/*",
    dest: outputDir + "/fonts",
  },

  cssLibsOutputName: "libs.min.css", // libs css output
  jsLibsOutputName: "libs.min.js", // libs js output
  cssAppOutputName: "style.min.css", // custom scss output
  jsAppOutputName: "app.min.js", // custom js output
};

// LOGIC

const { src, dest, parallel, series, watch } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const fileinclude = require("gulp-file-include");
const cleancss = require("gulp-clean-css");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const newer = require("gulp-newer");
const rsync = require("gulp-rsync");
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
function browsersync() {
  browserSync.init({
    server: { baseDir: outputDir + "/" },
    notify: false,
    online: online,
  });
}

// Use js bundle if needed
async function lib_scripts() {
  //   return src(paths.lib_scripts.src)
  //     // .pipe(concat(paths.jsLibsOutputName))
  //     .pipe(uglify())
  //     .pipe(dest(paths.lib_scripts.dest))
  //     .pipe(dest(baseDir + "/js"))
  //     .pipe(browserSync.stream());
}

function app_scripts() {
  return src(paths.app_scripts.src)
    .pipe(dest(paths.app_scripts.dest))
    .pipe(browserSync.stream());
}

function app_styles() {
  return src(paths.app_styles.src)
    .pipe(sourcemaps.init())
    .pipe(eval(preprocessor)())
    .pipe(concat(paths.cssAppOutputName))
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    )
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.app_styles.dest))
    .pipe(browserSync.stream());
}

function images_optimized() {
  return src(paths.images_optimized.src)
    .pipe(newer(paths.images_optimized.dest))
    .pipe(dest(outputDir + "/images/"))
    .pipe(imagemin())
    .pipe(dest(paths.images_optimized.dest));
}

function html_files() {
  return src(paths.html_files.src)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(htmlmin({ collapseWhitespace: false, removeComments: false }))
    .pipe(dest(paths.html_files.dest));
}

function php_files() {
  return src(paths.php_files.src).pipe(dest(paths.php_files.dest));
}

function fonts() {
  return src(paths.fonts.src).pipe(dest(paths.fonts.dest));
}

function cleanimg() {
  return del("" + paths.images_optimized.dest + "/**/*", { force: true });
}

function startwatch() {
  watch(baseDir + "/**/*.html", html_files);
  watch(baseDir + "/**/*.php", php_files);
  watch(baseDir + "/fonts/**/*", fonts);
  watch(baseDir + "/**/" + preprocessor + "/**/*", app_styles);
  watch(baseDir + "/**/*.{" + imageswatch + "}", images_optimized);
  watch(baseDir + "/**/*.{" + fileswatch + "}").on(
    "change",
    browserSync.reload
  );
  watch(
    [baseDir + "/**/*.js", "!" + paths.lib_scripts.dest + "/*.min.js"],
    app_scripts
  );
}
function clean(cb) {
  cb();
}
function build(cb) {
  cb();
  
}

exports.build = parallel(
  images_optimized,
  lib_scripts,
  app_styles,
  app_scripts,
  php_files,
  html_files,
  fonts,
);

exports.browsersync = browsersync;
exports.assets = series(
  cleanimg,
  lib_scripts,
  images_optimized,
  php_files,
  html_files,
  fonts
);
//exports.lib_styles = lib_styles;
exports.lib_scripts = lib_scripts;
exports.app_styles = app_styles;
exports.app_scripts = app_scripts;
exports.images_optimized = images_optimized;
exports.html_files = html_files;
exports.php_files = php_files;
exports.fonts = fonts;
exports.cleanimg = cleanimg;
exports.default = parallel(
  images_optimized,
  lib_scripts,
  app_styles,
  app_scripts,
  php_files,
  html_files,
  fonts,
  browsersync,
  startwatch,
);
