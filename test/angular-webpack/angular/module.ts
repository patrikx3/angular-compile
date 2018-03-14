import {
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA,

} from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';

import { CorifeusMaterialModule } from 'corifeus-web-material'
import { CorifeusModule } from 'corifeus-web';

import {Page } from './page';
import {
    CompileModule,

} from '../../../src';




export const routes: Routes = [
    {
        path: '',
        component: Page,
    },
];

@NgModule({
    imports: [
        BrowserModule,
///        CompileModule,
        CorifeusMaterialModule,
//        CorifeusModule,
        RouterModule.forRoot(routes),

        CompileModule.forRoot({
            module: {
//                schemas: [CUSTOM_ELEMENTS_SCHEMA],
//                declarations: [],
                imports: [
                    CorifeusMaterialModule
                ],
                exports: [

                ]

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
