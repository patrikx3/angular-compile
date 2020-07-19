import {
    NgModule,
} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

import {CorifeusMaterialModule} from './modules/material'

import {Page} from './page';
import {
    CompileModule,
} from '../../../src';

import {MatDividerModule} from '@angular/material/divider'

import "../assets/style.scss";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export const routes: Routes = [
    {
        path: '',
        component: Page,
    },
];

@NgModule({
    imports: [
        BrowserAnimationsModule,
        CorifeusMaterialModule,
        MatDividerModule,
        RouterModule.forRoot(routes),
        CompileModule
    ],
    declarations: [
        Page,
    ],
    providers: [],
    bootstrap: [Page]
})
export class Module {
};
