export { CompileHtmlService } from "./CompileHtmlService";
export { CompileHtmlAttribute} from "./CompileHtmlAttribute";

import { CompileHtmlService } from "./CompileHtmlService";
import { CompileHtmlAttribute} from "./CompileHtmlAttribute";

import { NgModule, ModuleWithProviders } from '@angular/core';

import { Compiler } from '@angular/core';
import {JitCompilerFactory} from '@angular/compiler';
export function createJitCompiler () {
    return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
}


// exports = component
@NgModule({
    imports: [
    ],
    declarations: [
        CompileHtmlAttribute,
    ],
    providers: [
        CompileHtmlService,
        { provide: Compiler, useFactory:  createJitCompiler},
    ],
    exports: [
        CompileHtmlAttribute,
        CompileHtmlAttribute,
    ],
    entryComponents: [

    ]
})
export class P3XCompileHtmlModule {
}