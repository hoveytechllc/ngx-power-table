/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

  var paths = {
    // paths serve as alias
    'npm:': 'libs/'
  };

  var map = {
    // our app
    "app": "app",

    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.min.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.min.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.min.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.min.js',
    '@angular/platform-browser/testing/browser_util': 'npm:@angular/platform-browser/testing/browser_util.min.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.min.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.min.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.min.js',

    // other libraries
    'rxjs': 'npm:rxjs',
    'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
    'ng2-power-table': 'npm:ng2-power-table',
    'ng2-bootstrap/ng2-bootstrap': 'npm:ng2-bootstrap',
    'ng2-bootstrap/components': 'npm:ng2-bootstrap/bundles',
    "moment": "npm:moment/moment.js"
  };

  var packages = {
    "app": { main: "main.js", defaultExtension: "js" },
    "rxjs": { defaultExtension: "js" },
    "angular2-in-memory-web-api": { defaultExtension: "js" },
    "ng2-power-table": { main: "index.js", defaultExtension: "js" },
    "ng2-bootstrap/ng2-bootstrap": { main: "ng2-bootstrap.js", defaultExtension: "js"},
    "ng2-bootstrap/components": {  defaultExtension: "js"}
  };

  var config = {
    paths: paths,
    map: map,
    packages: packages
  };

  System.config(config);
})(this);