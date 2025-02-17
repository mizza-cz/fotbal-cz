// Gulp for v2 frontend development
const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const browsersync = require('browser-sync');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const data = require('gulp-data');
const del = require('del');
const fs = require('fs');
const { readFileSync } = require('fs');
const gulpif = require('gulp-if');
const htmlreplace = require('gulp-html-replace');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const nunjucksRender = require('gulp-nunjucks-render');
const postcss = require('gulp-postcss');
const prettyHtml = require('gulp-pretty-html');
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');
const uglify = require('gulp-uglify');

// File paths
const paths = {
  admin: {
    testHTMLs: './www/**/*.html',
    templates: './app/Admin/**/*.latte',
    styles: {
      src: './www/adminwww/scss/**/*.scss',
      dest: './www/adminwww/css/',
    },
    javascript: './www/adminwww/js/**/*.js',
  },
  web: {
    data: {
      src: './www/src/data.json',
    },
    html: {
      src: './www/src/**/*.html',
      pages: './www/src/pages/**/*.+(html|njk|nunjucks)',
      templates: './www/src/templates/**/*.+(html|njk|nunjucks)',
      dest: './www/dist/**/*.html',
    },
    styles: {
      scss: './www/src/scss/**/*.scss',
      css: './www/src/css/',
      dest: './www/dist/css/',
    },
    javascript: {
      src: {
        custom: [
          './www/src/js/components/*.js',
          './www/src/js/features/*.js',
          './www/src/js/main.js',
        ],
        vendors: './www/src/js/vendors/*.js',
        others: './www/src/js/others/*.js',
      },
      dest: {
        custom: './www/dist/js/',
        vendors: './www/dist/js/vendors/',
        others: './www/dist/js/others/',
      },
    },
    images: {
      src: './www/src/img/**/*',
      dest: './www/dist/img/',
    },
    svgs: {
      src: './www/src/img/sprite/*.svg',
    },
    fonts: {
      src: './www/src/fonts/**/*',
      dest: './www/dist/fonts/',
    },
    docs: {
      src: './www/src/docs/**/*',
      dest: './www/dist/docs/',
    },
    others: {
      src: '',
    },
  },
};

// Browsersync serve
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: './',
    },
    startPath: '/www/src/index.html',
    online: true,
    tunnel: true,
  });
  cb();
}

// Browsersync serve with proxy
function browsersyncServeProxy(cb) {
  browsersync.init({
    proxy: 'http://www.fotbal.l:8080/admin/',
  });
  cb();
}

// Browsersync reload
function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// WEB - Watch file changes
function watchChanges() {
  watch(paths.web.html.src, browsersyncReload);
  watch([paths.web.html.pages, paths.web.html.templates], nunjucks);
  watch(paths.web.data.src, series(nunjucks, browsersyncReload));
  watch(paths.web.styles.scss, series(stylesWeb, browsersyncReload));
  watch(paths.web.javascript.src.custom, browsersyncReload);
}

// ADMIN - Watch file changes
function watchChangesAdmin() {
  watch(paths.admin.testHTMLs, browsersyncReload);
  watch(paths.admin.templates, browsersyncReload);
  watch(paths.admin.styles.src, series(stylesAdmin, browsersyncReload));
  watch(paths.admin.javascript, browsersyncReload);
}

// WEB - Compile Nunjucks templates into HTML
function nunjucks() {
  return src(paths.web.html.pages)
    .pipe(
      data(() => {
        return JSON.parse(fs.readFileSync(paths.web.data.src));
      }),
    )
    .pipe(
      nunjucksRender({
        path: ['./www/src/templates/'],
      }),
    )
    .pipe(
      prettyHtml({
        indent_size: 2,
      }),
    )
    .pipe(dest('./www/src/'));
}

// WEB - Compile SCSS into CSS, , add prefixes
function stylesWeb() {
  return src(paths.web.styles.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.web.styles.css));
}

// WEB - Minify CSS
function minifyCSS() {
  return src('./www/src/css/main.css')
    .pipe(
      purgecss({
        content: [paths.web.html.src],
        safelist: {
          standard: [
            /Article/,
            /autoComplete/,
            /dayContainer/,
            /dir-d/,
            /dir-u/,
            /edd/,
            /embed/,
            /esgallery/,
            /flatpickr/,
            /fis/,
            /highlight/,
            /iframe/,
            /is/,
            /Match/,
            /media/,
            /select2/,
            /swiper/,
            /twitter/,
            /u-display-/,
            /u-float-/,
            /YouTubeContainer/,
          ],
          deep: [
            /Article/,
            /autoComplete/,
            /dayContainer/,
            /dir-d/,
            /dir-u/,
            /edd/,
            /embed/,
            /esgallery/,
            /flatpickr/,
            /fis/,
            /highlight/,
            /iframe/,
            /is/,
            /Match/,
            /media/,
            /select2/,
            /swiper/,
            /twitter/,
            /u-display-/,
            /u-float-/,
            /YouTubeContainer/,
          ],
          greedy: [
            /Article/,
            /autoComplete/,
            /dayContainer/,
            /dir-d/,
            /dir-u/,
            /edd/,
            /embed/,
            /esgallery/,
            /flatpickr/,
            /fis/,
            /highlight/,
            /iframe/,
            /is/,
            /Match/,
            /media/,
            /select2/,
            /swiper/,
            /twitter/,
            /u-display-/,
            /u-float-/,
            /YouTubeContainer/,
          ],
        },
      }),
    )
    .pipe(postcss([cssnano()]))
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(dest(paths.web.styles.dest));
}

// ADMIN - Compile SCSS into CSS, add prefixes and minify CSS
function stylesAdmin() {
  return src(paths.admin.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(paths.admin.styles.dest))
    .pipe(postcss([cssnano()]))
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.admin.styles.dest));
}

// WEB - Compile and minify JS
function minifyJS() {
  return src(paths.web.javascript.src.custom)
    .pipe(sourcemaps.init())
    .pipe(
      gulpif(
        '!*.min.js',
        babel({
          presets: ['@babel/env'],
        }),
      ),
    )
    .pipe(
      gulpif(
        '!*.min.js',
        uglify({
          output: {
            comments: /^!/,
          },
        }),
      ),
    )
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.web.javascript.dest.custom));
}

// WEB - Compress images
function compressImg() {
  return src(paths.web.images.src)
    .pipe(newer(paths.web.images.dest))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        }),
      ]),
    )
    .pipe(dest(paths.web.images.dest));
}

// WEB - SVG sprite
const svgSpriteConfig = {
  dest: './www/dist/',
  mode: {
    symbol: {
      dest: './img/',
      sprite: 'sprite.svg',
    },
  },
};

function buildSvgSprite() {
  return src('./www/src/img/sprite/*.svg')
    .pipe(svgSprite(svgSpriteConfig))
    .pipe(dest('./www/dist/'));
}

// WEB - Clean "dist" folder
function cleanDist() {
  return del(['./www/dist/*.html', './www/dist/css/main*.css', './www/dist/js/']);
}

// WEB -Copy HTML files from "src" to "dist" folder with replaced CSS and JavaScript paths
function copyHTML() {
  return src(paths.web.html.src)
    .pipe(
      htmlreplace({
        css: {
          src: './css/main.min.css',
        },
        js: {
          src: './js/main.min.js',
          tpl: '<script src="%s" defer></script>',
        },
      }),
    )
    .pipe(dest('./www/dist/'));
}

// WEB - Copy vendor CSS from "src" to "dist"
function copyVendorCSS() {
  return src(['./www/src/css/**/*', '!./www/src/css/main*.css']).pipe(dest(paths.web.styles.dest));
}

// WEB - Copy vendor JS from "src" to "dist"
function copyVendorJS() {
  return src(paths.web.javascript.src.vendors).pipe(dest(paths.web.javascript.dest.vendors));
}

// WEB - Copy others JS from "src" to "dist"
function copyOthersJS() {
  return src(paths.web.javascript.src.others).pipe(dest(paths.web.javascript.dest.others));
}

// WEB - Copy fonts from "src" to "dist"
function copyFonts() {
  return src(paths.web.fonts.src).pipe(dest(paths.web.fonts.dest));
}

// WEB - Copy docs files from "src" to "dist"
function copyDocs() {
  return src(paths.web.docs.src).pipe(dest(paths.web.docs.dest));
}

// WEB - Copy other files from "src" to "dist"
// function copyOtherFiles() {
//   return src(paths.web.others.src).pipe(dest("./www/dist/"));
// }

// WEB - Revision
function revision() {
  return src(['./www/dist/**/main*.{css,js}', '!./www/dist/js/vendors/**'])
    .pipe(rev())
    .pipe(dest('./www/dist/'))
    .pipe(rev.manifest())
    .pipe(dest('./www/dist/'));
}

// WEB - Rewrite
function rewrite() {
  const manifest = readFileSync('./www/dist/rev-manifest.json');
  return src('./www/dist/**/*.html').pipe(revRewrite({ manifest })).pipe(dest('./www/dist/'));
}

// WEB - Dev task
const dev = series(browsersyncServe, watchChanges);
exports.default = dev;

// WEB - SVG sprite
exports.svg = buildSvgSprite;

// WEB - Production task
const build = series(
  cleanDist,
  copyHTML,
  copyVendorCSS,
  copyVendorJS,
  copyOthersJS,
  copyFonts,
  copyDocs,
  minifyCSS,
  minifyJS,
  compressImg,
  revision,
  rewrite,
);
exports.build = build;

// ADMIN Dev task
const admin = series(browsersyncServeProxy, watchChangesAdmin);
exports.admin = admin;
