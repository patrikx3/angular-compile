import {
    ViewContainerRef,
} from '@angular/core';

export interface CompileOptions {
    template: string;
    container: ViewContainerRef;
    imports?: any[];
    context?: any,
    onCompiled?: Function,
    onError?: Function;
}
