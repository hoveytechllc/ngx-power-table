import { Provider, Type, DebugElement, Component } from "@angular/core";
import { TestBed, inject, ComponentFixture, TestComponentRenderer } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture } from './component.factory';

import { ConfigurationProvider } from './../../src/Configuration/ConfigurationProvider.class';
import { DefaultConfiguration } from './../../src/Configuration/DefaultConfiguration.class';

describe('ConfigurationProvider tests', function () {

    beforeEach(() => TestBed.configureTestingModule({ providers: [ConfigurationProvider] }));

    it('globalConfiguration getter should always return value', () => {
        var configurationProvider = <ConfigurationProvider>TestBed.get(ConfigurationProvider);

        expect(configurationProvider.globalConfiguration).toBeDefined();

        configurationProvider.globalConfiguration = undefined;
        expect(configurationProvider.globalConfiguration).toBeDefined();

    });

    it('event emitter is called when config set', () => {
        var configurationProvider = <ConfigurationProvider>TestBed.get(ConfigurationProvider);

        var called: boolean = false;
        var unsubscribe = configurationProvider.globalConfigurationChanged.subscribe(() => {
            called = true;
        });

        var newConfig = DefaultConfiguration.create();
        configurationProvider.globalConfiguration = newConfig;

        expect(called).toBeTruthy();
        unsubscribe.unsubscribe();
    });
    
    it('event emitter is called when config property changed', () => {
        var configurationProvider = <ConfigurationProvider>TestBed.get(ConfigurationProvider);

        var called: boolean = false;
        var unsubscribe = configurationProvider.globalConfigurationChanged.subscribe(() => {
            called = true;
        });

        configurationProvider.globalConfiguration.ascendingCssClass = 'another value'

        expect(called).toBeTruthy();
        unsubscribe.unsubscribe();
    });
});
