import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CompileModule} from "../../projects/angular-compile/src/lib/angular-compile.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

import { MatDividerModule} from "@angular/material/divider";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        MatDividerModule,
        BrowserAnimationsModule,
        //MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        CompileModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
