import {
    ViewContainerRef,
} from '@angular/core';

export interface CompileHtmlServiceOptions {
    template: string;
    container: ViewContainerRef;
    imports?: any[];
    context?: any,
    onCompiled?: Function,
    onError?: Function;
}


