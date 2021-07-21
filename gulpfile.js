// const gulp = require ("gulp")
const { src, dest, task, series, watch } = require("gulp")
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


task('clean', function () {
    return src('dist/css/main.css', {read: false})
    .pipe(clean());
});

task ('styles', function() {
    return src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob()) 
    .pipe(sass().on('error', sass.logError))
    // .pipe(gcmq()) -- данный плагин ошибочно форматирует @import шрифтов из гугл
    .pipe(autoprefixer({
        overrideBrowserslist: ["last 2 versions"] ,
        cascade: false
    }))
    // .pipe(cleanCSS()) -- при попытке минимизировать css - в итоговом файле стилей проставляются неверные относительные пути для бэкгранудов
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
})

task ('scripts', function () {
    return src('src/scripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js', {newLine: ';'}))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    
})


task ("default", series ("styles")) 

