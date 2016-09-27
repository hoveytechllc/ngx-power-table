"use strict";
var testing_1 = require('@angular/core/testing');
var ConfigurationProvider_class_1 = require('./../../src/Configuration/ConfigurationProvider.class');
var DefaultConfiguration_class_1 = require('./../../src/Configuration/DefaultConfiguration.class');
describe('ConfigurationProvider tests', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({ providers: [ConfigurationProvider_class_1.ConfigurationProvider] }); });
    it('globalConfiguration getter should always return value', function () {
        var configurationProvider = testing_1.TestBed.get(ConfigurationProvider_class_1.ConfigurationProvider);
        expect(configurationProvider.globalConfiguration).toBeDefined();
        configurationProvider.globalConfiguration = undefined;
        expect(configurationProvider.globalConfiguration).toBeDefined();
    });
    it('event emitter is called when config set', function () {
        var configurationProvider = testing_1.TestBed.get(ConfigurationProvider_class_1.ConfigurationProvider);
        var called = false;
        var unsubscribe = configurationProvider.globalConfigurationChanged.subscribe(function () {
            called = true;
        });
        var newConfig = DefaultConfiguration_class_1.DefaultConfiguration.create();
        configurationProvider.globalConfiguration = newConfig;
        expect(called).toBeTruthy();
        unsubscribe.unsubscribe();
    });
    it('event emitter is called when config property changed', function () {
        var configurationProvider = testing_1.TestBed.get(ConfigurationProvider_class_1.ConfigurationProvider);
        var called = false;
        var unsubscribe = configurationProvider.globalConfigurationChanged.subscribe(function () {
            called = true;
        });
        configurationProvider.globalConfiguration.ascendingCssClass = 'another value';
        expect(called).toBeTruthy();
        unsubscribe.unsubscribe();
    });
});
//# sourceMappingURL=ConfigurationProvider.spec.js.map