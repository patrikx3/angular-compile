import {
    ViewContainerRef,
} from '@angular/core';

export interface CompileHtmlServiceOptions {
    template: string;
    container: ViewContainerRef;
    imports?: any[];
    ref?: any
}


