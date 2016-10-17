(function (global) {

  var config = {
    paths: {
      // paths serve as alias
      'npm:': 'build/libs/'
    },
    map: {
      "app": "app",

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      'moment': 'npm:moment/moment.js',
    },
    packages: {
      "app": { main: "main.js", defaultExtension: "js" }
    },
    bundles: {
      'npm:ng2-bootstrap/bundles/ng2-bootstrap.js': ['ng2-bootstrap/*'],
      'npm:ng2-power-table/bundles/ng2-power-table.min.js': ['ng2-power-table/*']
    }
  };

  System.config(config);
})(this);