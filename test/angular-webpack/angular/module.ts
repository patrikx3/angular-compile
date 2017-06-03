import {
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {Page } from './page';
import {
    CompileModule,

} from '../../../src';

@NgModule({
    imports: [
        BrowserModule,
        CompileModule.forRoot({
            module: {
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                declarations: [],
                imports: [],

            }
        })
    ],
    declarations: [
        Page,
    ],
    providers: [
    ],
    bootstrap: [ Page ]
})
export class Module { };
