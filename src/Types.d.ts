import {
    ViewContainerRef,
} from '@angular/core';

export enum CacheType {
    Template,
    JSON
}

export interface CompileOptions {
    template: string;
    container: ViewContainerRef;
    imports?: any[];
    context?: any,
    onCompiled?: Function,
    onError?: Function;
    cache?: CacheType,
}

export interface Cache {
    type: CacheType,
    template?: string,
    json?: object
}

