/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

  var paths = {
    // paths serve as alias
    'npm:': 'node_modules/'
  };

  var map = {
    // our app
    "app": "app",

    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser/testing/browser_util': 'npm:@angular/platform-browser/testing/browser_util.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

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