'use strict';

var gulp = require('gulp');

var moduleDir = './public/js/*.js';

var es6ModuleTranspiler = require("gulp-es6mt");
gulp.task('es6', function() {
    gulp.src(moduleDir)
        .pipe(es6ModuleTranspiler({
            formatter: new es6ModuleTranspiler.formatters.bundle
        }))
        .pipe(gulp.dest('dist/mt'));
});

var to5 = require('gulp-6to5');
gulp.task('to5', function () {
    return gulp.src(moduleDir)
        .pipe(to5({
            modules: 'umd'
        }))
        .pipe(gulp.dest('dist/to5'));
});

var traceur = require('gulp-traceur');
gulp.task('traceur', function () {
    return gulp.src(moduleDir)
        .pipe(traceur({
            modules: 'commonjs'
        }))
        .pipe(gulp.dest('dist/traceur'));
});

gulp.task('build', ['es6', 'to5', 'traceur'])
