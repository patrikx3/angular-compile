import {
    NgModule,
} from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CorifeusMaterialModule } from 'corifeus-web-material'

import {Page } from './page';
import {
    CompileModule,
} from '../../../src';

import { MatDividerModule } from '@angular/material'


export const routes: Routes = [
    {
        path: '',
        component: Page,
    },
];

@NgModule({
    imports: [
  //     BrowserModule,
///        CompileModule,
        CorifeusMaterialModule,
        MatDividerModule,
//        CorifeusModule,
        RouterModule.forRoot(routes),

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
