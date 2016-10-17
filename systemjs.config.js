/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

  var paths = {
    // paths serve as alias
    'npm:': 'libs/',
    // 'rxjs/*': 'libs/rxjs/bundles/rx.js'
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
    'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
    'ng2-power-table': 'npm:ng2-power-table',
    "moment": "npm:moment/moment.js"
  };

  var packages = {
    "app": { main: "main.js", defaultExtension: "js" },
    "angular2-in-memory-web-api": { defaultExtension: "js" },
    "ng2-power-table": { main: "index.js", defaultExtension: "js" }
  };

  var config = {
    paths: paths,
    map: map,
    packages: packages,
    bundles: {
      'libs/ng2-bootstrap/bundles/ng2-bootstrap.js': ['ng2-bootstrap/*'],
      'libs/rxjs/rx.js': ['rxjs/*']
    }
  };

  System.config(config);
})(this);