var gulp = require('gulp');
var Builder = require("systemjs-builder");
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var jsBuildDir = 'build/js';
var cssBuildDir = 'build/css';

var cssMinOutFile = 'site.min.css';

var coreJsOutFile = 'core.js';
var coreJsMinOutFile = 'core.min.js';

var cssSourceFiles = [
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/font-awesome/css/font-awesome.css',
    'css/sb-admin-2.css',
    'node_modules/ng2-power-table/src/ng2-power-table.css',
    'pretty-print/prettify.css',
    'css/site.css',
    'bower_components/animate.css/animate.min.css'
];

var coreJsFiles = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/chance/dist/chance.min.js',
    'node_modules/lodash/lodash.min.js',
    'pretty-print/prettify.js',
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.min.js',
    'node_modules/reflect-metadata/reflect.js',
    'node_modules/systemjs/dist/system.src.js',
];

gulp.task('bundle-rxjs', function (done) {
    // SystemJS build options.
    var options = {
        normalize: true,
        runtime: false,
        sourceMaps: true,
        sourceMapContents: true,
        minify: false,
        mangle: false
    };
    var builder = new Builder('./');
    builder.config({
        paths: {
            "n:*": "node_modules/*",
            "rxjs/*": "node_modules/rxjs/*.js",
        },
        map: {
            "rxjs": "n:rxjs",
        },
        packages: {
            "rxjs": { main: "Rx.js", defaultExtension: "js" },
        }
    });

    builder.bundle('rxjs', jsBuildDir +  '/rx.js', options)
        .then(function () {

            console.log('bundle-rxjs succeeded.');
            done();
        })
        .catch(function () {
            console.log('bundle-rxjs failed.');
            done();
        });
});

gulp.task('copy-node', function () {
    gulp.src('node_modules/@angular/**/*.js').pipe(gulp.dest('build/libs/@angular'));
    gulp.src('node_modules/moment/**/*.js').pipe(gulp.dest('build/libs/moment'));
    gulp.src('node_modules/ng2-bootstrap/**/*.js').pipe(gulp.dest('build/libs/ng2-bootstrap'));
    gulp.src('node_modules/ng2-power-table/**/*.js').pipe(gulp.dest('build/libs/ng2-power-table'));
});

gulp.task('concat-js', function () {
    gulp.src(coreJsFiles)
        .pipe(concat(coreJsOutFile))
        .pipe(gulp.dest(jsBuildDir));
});

gulp.task('minify-js', ['bundle-rxjs', 'concat-js'], function () {
    gulp.src(jsBuildDir + '/' + coreJsOutFile)
        .pipe(rename(coreJsMinOutFile))
        .pipe(uglify())
        .pipe(gulp.dest(jsBuildDir));
});

gulp.task('copy-fonts', function () {
    gulp.src('bower_components/font-awesome/fonts/*.*')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('concat-minify-css', function () {
    gulp.src(cssSourceFiles)
        .pipe(minifyCss())
        .pipe(concat(cssMinOutFile))
        .pipe(gulp.dest(cssBuildDir));
});

gulp.task('build', ['copy-node', 'copy-fonts', 'concat-js', 'minify-js', 'concat-minify-css'], function () {

});