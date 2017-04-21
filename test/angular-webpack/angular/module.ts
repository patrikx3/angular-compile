import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {Page } from './page';
import {
    CompileModule
} from '../../../src';

@NgModule({
    imports: [
        BrowserModule,
        CompileModule
    ],
    declarations: [
        Page,
    ],
    providers: [
    ],
    bootstrap: [ Page ]
})
export class Module { };
