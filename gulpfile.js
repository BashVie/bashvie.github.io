const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')
const packageImporter = require('node-sass-package-importer')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

sass.compiler = require('dart-sass')

function styles(cb) {
    var plugins = [
        autoprefixer
    ]
    src('./src/sass/**/*.scss')
        .pipe(sass.sync({
            importer: packageImporter()
        }).on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(dest('./dist/css'))
    cb()
}

function moveSource(cb) {
    src(['./src/**/*.html', './src/**/*.js'])
        .pipe(dest('./dist'))
    cb()
}

exports.default = series(moveSource, styles)
