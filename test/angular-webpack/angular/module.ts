import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {Page } from './page';
import {
    P3XCompileHtmlModule
} from '../../../src';

@NgModule({
    imports: [
        BrowserModule,
        P3XCompileHtmlModule
    ],
    declarations: [
        Page,
    ],
    providers: [
    ],
    bootstrap: [ Page ]
})
export class Module { };
