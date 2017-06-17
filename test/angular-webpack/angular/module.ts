import {
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { CorifeusMaterialModule } from 'corifeus-web-material'

import {Page } from './page';
import {
    CompileModule,

} from '../../../src';

@NgModule({
    imports: [
        BrowserModule,
        CorifeusMaterialModule,
        CompileModule.forRoot({
            module: {
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                declarations: [],
                imports: [
                    CorifeusMaterialModule
                ],

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
