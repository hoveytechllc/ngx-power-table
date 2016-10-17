var gulp = require('gulp');
var Builder = require("systemjs-builder");
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');

var distDir = 'bundles';
var distJs = distDir + '/ng2-power-table.js';
var minifiedJs = 'ng2-power-table.min.js';

gulp.task('bundle', function (cb) {
    // SystemJS build options.
    var options = {
        normalize: true,
        runtime: false,
        sourceMaps: true,
        sourceMapContents: true,
        minify: false,
        mangle: false,
        externals: [
            '@angular/core',
            '@angular/common'
        ]
    };

    var builder = new Builder('./');
    builder.config({
        paths: {
            'ng2-power-table/ng2-power-table': 'ng2-power-table.js',
            'ng2-power-table/src/*': 'src/*.js'
        },
        packages: {
            'src' : {defaultExtension: 'js'}
        }
    });

    builder.bundle('ng2-power-table/ng2-power-table', distJs, options)
        .then(function () {

            console.log('bundle succeeded.');
            cb();
        })
        .catch(function (e) {
            console.log('bundle failed. Error: ' + e);
            cb();
        });
});

gulp.task('minify', ['bundle'], function () {
   gulp.src(distJs)
        .pipe(rename(minifiedJs))
        .pipe(uglify())
        .pipe(gulp.dest(distDir));

            console.log('minify complete.');
});

gulp.task('build', ['bundle', 'minify'], function () {
   
});
