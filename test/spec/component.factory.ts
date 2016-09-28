import { Provider, Type, DebugElement, Component } from "@angular/core";
import { TestBed, ComponentFixture } from '@angular/core/testing';

@Component({ selector: 'root', template: '' })
export class TestComp {

}

///
export function createComponentFixtureAfterSetup<T>(comp: Type<T>): ComponentFixture<T> {
    var fix = TestBed.createComponent(comp);
    fix.detectChanges();
    return fix;
}

export function SetupComponentFixture<T>(
    template: string, providers: Provider[] = null, comp: Type<T> = null) {
    if (!comp) {
        comp = <any>TestComp;
    }
    TestBed.overrideComponent(comp, { set: { template } });
    if (providers && providers.length) {
        TestBed.overrideComponent(comp, { add: { providers: providers } });
    }
}

export function createComponentFixture<T>(
    template: string, providers: Provider[] = null, comp: Type<T> = null): ComponentFixture<T> {
    if (!comp) {
        comp = <any>TestComp;
    }
    TestBed.overrideComponent(comp, { set: { template } });
    if (providers && providers.length) {
        TestBed.overrideComponent(comp, { add: { providers: providers } });
    }
    var fix = TestBed.createComponent(comp);
    fix.detectChanges();
    return fix;
}

export function createComponent(
    template: string, providers: Provider[] = null, comp: Type<any> = null): DebugElement {
    const fixture = createComponentFixture(template, providers, comp);
    //fixture.detectChanges();
    return fixture.debugElement;
}
