import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {Page } from './page';
import {
    CompileHtmlService,
    CompileHtmlAttribute,
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
    ],
    declarations: [
        Page,
        CompileHtmlAttribute,
    ],
    providers: [
        // FIXME requires with AOT
        { provide: Compiler, useFactory:  createJitCompiler},
        CompileHtmlService,
    ],
    bootstrap: [ Page ]
})
export class Module { };
