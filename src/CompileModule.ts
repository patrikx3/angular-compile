//import { CompileService, CompileServiceConfig,    } from "./CompileService";
import {CompileAttribute} from "./CompileAttribute";

import {
    NgModule,
    //ModuleWithProviders,
} from '@angular/core';

import {CommonModule} from '@angular/common';

/*
import { BrowserModule } from '@angular/platform-browser';
import { Compiler } from '@angular/core';
import {JitCompilerFactory} from '@angular/compiler';
export function createJitCompiler () {
    return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
}
*/

/*
export class CompileServiceConfig {
    module: NgModule
}
*/

// exports = component
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CompileAttribute,
    ],
    providers: [
//        CompileService,
//        { provide: Compiler, useFactory:  createJitCompiler},
    ],
    exports: [
        CompileAttribute,
    ],
    entryComponents: []
})
export class CompileModule {
}

