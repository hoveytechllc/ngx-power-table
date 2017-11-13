import { Provider, Type, DebugElement, Component } from "@angular/core";
import { TestBed, inject, ComponentFixture, TestComponentRenderer, fakeAsync } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture } from '../TestHelpers/component.factory';

import { ConfigurationProvider } from './../../src/Configuration/ConfigurationProvider.class';
import { DefaultConfiguration } from './../../src/Configuration/DefaultConfiguration.class';

describe('ConfigurationProvider tests', function () {
    let sut: ConfigurationProvider;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConfigurationProvider]
        });

        sut = TestBed.get(ConfigurationProvider);
    });

    it('simple test', fakeAsync(() => {
        expect(true).toBeTruthy();
    }));

    it('globalConfiguration getter should always return value', fakeAsync(() => {
        expect(sut.globalConfiguration).toBeDefined();

        sut.globalConfiguration = undefined;
        expect(sut.globalConfiguration).toBeDefined();
    }));

    it('event emitter is called when config set', fakeAsync(() => {
        var called: boolean = false;
        var unsubscribe = sut.globalConfigurationChanged.subscribe(() => {
            called = true;
        });

        var newConfig = DefaultConfiguration.create();
        sut.globalConfiguration = newConfig;

        expect(called).toBeTruthy();
        unsubscribe.unsubscribe();
    }));

    it('event emitter is called when config property changed', fakeAsync(() => {
        var called: boolean = false;
        var unsubscribe = sut.globalConfigurationChanged.subscribe(() => {
            called = true;
        });

        sut.globalConfiguration.ascendingCssClass = 'another value'

        expect(called).toBeTruthy();
        unsubscribe.unsubscribe();
    }));
});
