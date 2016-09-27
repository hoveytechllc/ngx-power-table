// #docregion
module.exports = function(config) {

  var appBase    = 'src/';       // transpiled app JS and map files
  var appSrcBase = 'src/';       // app source TS files
  var appAssets  = '/base/src/'; // component assets fetched by Angular's compiler

  var testBase    = 'test/spec/';       // transpiled test JS and map files
  var testSrcBase = 'test/spec/';       // test source TS files

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-coverage')
    ],

    files: [
      // System.js for module loading
      'node_modules/systemjs/dist/system.src.js',

      // Polyfills
      'node_modules/core-js/client/shim.js',
      'node_modules/reflect-metadata/Reflect.js',

      // zone.js
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // Paths loaded via module imports:
      // Angular itself
      {pattern: 'node_modules/@angular/**/*.js', included: false, watched: false},
      {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false},

      {pattern: 'systemjs.config.js', included: false, watched: false},
      {pattern: 'systemjs.config.extras.js', included: false, watched: false},
      'karma-test-shim.js',

      // transpiled application & spec code paths loaded via module imports
      {pattern: 'index.js', included: false, watched: true},
      {pattern: 'src/**/*.js', included: false, watched: true},
      {pattern: 'test/spec/*.js', included: false, watched: true},

      // // Asset (HTML & CSS) paths loaded via Angular's component compiler
      // // (these paths need to be rewritten, see proxies section)
      {pattern: 'src/**/*.html', included: false, watched: true},

      // Paths for debugging with source maps in dev tools
      {pattern: 'index.ts', included: false, watched: true},
      {pattern: 'src/**/*.ts', included: false, watched: false},
      {pattern: 'src/**/*.js.map', included: false, watched: false},
      {pattern: 'test/spec/*.ts', included: false, watched: false},
      {pattern: 'test/spec/*.js.map', included: false, watched: false}
    ],

    // Proxied base paths for loading assets
    proxies: {
      // required for component assets fetched by Angular's compiler
      "/app/": appAssets
    },

    exclude: [],
    preprocessors: {
    //    'src/**/*.js': ['coverage'] 
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
        type: 'html',
        dir: 'coverage/'
    },

    // HtmlReporter configuration
    htmlReporter: {
      // Open this file to see results in browser
      outputFile: 'test/.output/tests.html',

      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: __dirname
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
}