var gulp = require('gulp');
var Builder = require("systemjs-builder");
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var nodeModules = [
    // angular and dependencies
    { name: "@angular", filter: "**/*.js" },
    { name: "angular2-in-memory-api", filter: "*.js" },
    { name: "systemjs", filter: "dist/*.js" },
    { name: "zone.js", filter: "dist/*.js" },
    { name: "core-js", filter: "client/*.js" },
    { name: "reflect-metadata", filter: "reflect.js" },
    { name: "ng2-power-table", filter: "**/*.*" },
    { name: "ng2-bootstrap", filter: "**/*.*" },
    { name: "lodash", filter: "lodash.min.js" },
    { name: "moment", filter: "moment.js" }
];

var bowerComponents = [
    { name: "bootstrap", filter: "**/*.*" },
    { name: "font-awesome", filter: "**/*.*" },
    { name: "jquery", filter: "**/*.*" },
    { name: "chance", filter: "dist/*.*" },
    { name: "animate.css", filter: "animate.min.css" }
];

gulp.task('restore-libs', function () {
    function copyLib(name, array) {
        array.forEach(function (lib) {
            gulp.src([
                name + "/" + lib.name + "/" + lib.filter
            ]).pipe(gulp.dest("./libs" + "/" + lib.name));
        });
    };

    copyLib('node_modules', nodeModules);
    copyLib('bower_components', bowerComponents);
});

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

    builder.bundle('rxjs', 'libs/rxjs/rx.js', options)
        .then(function () {

            console.log('bundle-rxjs succeeded.');
            done();
        })
        .catch(function () {
            console.log('bundle-rxjs failed.');
            done();
        });
});

gulp.task('minify-rxjs', function () {
    gulp.src('libs/rxjs/rx.js')
        .pipe(rename('rx.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('libs/rxjs'));
});

gulp.task('build', ['restore-libs', 'bundle-rxjs', 'minify-rxjs'], function () {

});