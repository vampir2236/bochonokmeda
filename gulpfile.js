/* global require*/
(function () {

    'use strict';


    var gulp = require('gulp'),
        less = require('gulp-less'),
        notify = require('gulp-notify'),
        concatCss = require('gulp-concat-css'),
        prefixer = require('gulp-autoprefixer'),
        minifyCss = require('gulp-minify-css'),
        rename = require('gulp-rename'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        watch = require('gulp-watch');


    /* less */
    gulp.task('less', function () {
        gulp.src('source/less/main.less')
            .pipe(less('main.css'))
            .on('error', function () {
                notify('Ошибка в задаче less!');
            })
            .pipe(prefixer('last 3 versions', 'ie >= 8'))
            .pipe(gulp.dest('./source/css'))
            .pipe(notify('less  Ok!'));
    });


    /* css */
    gulp.task('css', function () {
        gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css',
                  'source/css/main.css'])
            .pipe(concatCss('all.css'))
            .on('error', function () {
                notify('Ошибка в задаче css!');
            })
            .pipe(minifyCss())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('./app/css/'))
            .pipe(notify('css  Ok!'));
    });


    /* js */
    gulp.task('js', function () {
        gulp.src(['bower_components/jquery/dist/jquery.js',
                  'bower_components/bootstrap//dist/bootstrap.js',
                  'bower_components/handlebars/handlebars.js',
                  'source/js/jquery-ui.min.js',
                  'source/js/main.js'])
            .pipe(concat('all.js'))
            .pipe(uglify())
            .on('error', function () {
                notify('Ошибка в задаче js!');
            })
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('./app/js'))
            .pipe(notify('js  Ok!'));
    });


    /* watch */
    gulp.task('watch', function () {
        gulp.watch('./source/less/*.less', ['less']);
        gulp.watch('./source/css/*.css', ['css']);
        gulp.watch('./source/js/*.js', ['js']);
    });


    /* default */
    gulp.task('default', ['watch']);


})();