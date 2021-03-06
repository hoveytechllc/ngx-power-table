(function (global) {

  var config = {
    paths: {
      'npm:': 'base/node_modules/'
    },
    map: {
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/core/src/linker/element_injector': 'npm:@angular/core/src/linker/element_injector.js',
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
      'traceur': 'npm:traceur/bin/traceur.js'
    },
    packages: {
      'rxjs': { defaultExtension: 'js'}
    }
  };

  System.config(config);
})(this);