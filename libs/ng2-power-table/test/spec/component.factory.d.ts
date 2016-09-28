import { Provider, Type, DebugElement } from "@angular/core";
import { ComponentFixture } from '@angular/core/testing';
export declare class TestComp {
}
export declare function createComponentFixture<T>(template: string, providers?: Provider[], comp?: Type<T>): ComponentFixture<T>;
export declare function createComponent(template: string, providers?: Provider[], comp?: Type<any>): DebugElement;
