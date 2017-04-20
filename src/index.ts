export { CompileHtmlService } from "./CompileHtmlService";
export { CompileHtmlAttribute} from "./CompileHtmlAttribute";

import { CompileHtmlService } from "./CompileHtmlService";
import { CompileHtmlAttribute} from "./CompileHtmlAttribute";


import { NgModule, ModuleWithProviders } from '@angular/core';
// exports = component
@NgModule({
    imports: [
    ],
    declarations: [
        CompileHtmlAttribute,
    ],
    providers: [
        CompileHtmlService
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