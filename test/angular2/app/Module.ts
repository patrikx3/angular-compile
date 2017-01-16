import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {Page } from './Page';
import {CompileHtmlService} from '../../../src/CompileHtmlService';

@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        Page
    ],
    providers: [
        CompileHtmlService
    ],
    bootstrap: [ Page ]
})
export class Module { };
