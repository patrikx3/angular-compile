import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {Page } from './page';
import {
    P3XCompileHtmlModule
} from '../../../src';

// FIXME requires with AOT
import { Compiler } from '@angular/core';
import {JitCompilerFactory} from '@angular/compiler';
export function createJitCompiler () {
    return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
}

@NgModule({
    imports: [
        BrowserModule,
        P3XCompileHtmlModule
    ],
    declarations: [
        Page,
    ],
    providers: [
        // FIXME requires with AOT
        { provide: Compiler, useFactory:  createJitCompiler},
    ],
    bootstrap: [ Page ]
})
export class Module { };
