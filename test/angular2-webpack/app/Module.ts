import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {Page } from './Page';
import {CompileHtmlService, CompileHtmlAttribute} from '../../../src';


@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        Page,
        CompileHtmlAttribute
    ],
    providers: [
        CompileHtmlService
    ],
    bootstrap: [ Page ]
})
export class Module { };
