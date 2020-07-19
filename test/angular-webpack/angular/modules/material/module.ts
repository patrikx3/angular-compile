import {NgModule, ModuleWithProviders} from '@angular/core';
import {CorifeusModule} from '../web/module';

import {MatIconModule} from '@angular/material/icon'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatMenuModule,} from '@angular/material/menu'
import {MatButtonModule,} from '@angular/material/button'
import {MatTooltipModule,} from '@angular/material/tooltip'
import {MatToolbarModule,} from '@angular/material/toolbar'
import {MatCardModule,} from '@angular/material/card'
import {MatSnackBarModule,} from '@angular/material/snack-bar'

import {Boot} from './boot';

import {ThemeService} from './services/theme'

import {NotifyService} from './services/notify/notify'
import {NotifyComponent} from './services/notify/notify-component'

import {Http404} from './component/cory-mat-http-404'
import {Loading} from './component/cory-mat-loading'


import {ThemeButton} from './component/cory-mat-theme/cory-mat-theme-button'
import {ThemeMenu} from './component/cory-mat-theme/cory-mat-theme-menu'

import {TranslationButton} from './component/cory-mat-translation/cory-mat-translation-button'
import {TranslationMenu} from './component/cory-mat-translation/cory-mat-translation-menu'

import { CommonModule } from '@angular/common'

/*
 fix: allow users to disable the sanity checks
 @NgModule({
 providers: [
 {provide: MATERIAL_SANITY_CHECKS, useValue: false}
 ]

 // other config
 });

 https://github.com/angular/material2/issues/4125
 */
// https://github.com/angular/material2/pull/4178

// exports = component


/***
 * NEVER USE A EXPORT * AS, NEED THE EXACT COMPONENT FOR INJECTABLE FUNCTION!!!!


 const materialModules = [
 MatAutocompleteModule,
 MatButtonModule,
 MatButtonToggleModule,
 MatCardModule,
 MatCheckboxModule,
 MatChipsModule,
 MatCommonModule,
 MatDatepickerModule,
 MatDialogModule,
 MatExpansionModule,
 MatGridListModule,
 MatIconModule,
 MatInputModule,
 MatLineModule,
 MatListModule,
 MatMenuModule,
 MatNativeDateModule,
 MatOptionModule,
 MatPaginatorModule,
 MatProgressBarModule,
 MatProgressSpinnerModule,
 MatRadioModule,
 MatRippleModule,
 MatSelectModule,
 MatSidenavModule,
 MatSliderModule,
 MatSlideToggleModule,
 MatSnackBarModule,
 MatSortModule,
 MatTableModule,
 MatTabsModule,
 MatToolbarModule,
 MatTooltipModule,
 //    OverlayContainer,

 //    MatSelectionList,
 ]
 */
@NgModule({
    imports: [
        CorifeusModule,
        CommonModule,

        // material
        /*
                MatAutocompleteModule,
                MatButtonToggleModule,
                MatChipsModule,
                MatCommonModule,
                MatDatepickerModule,
                MatDialogModule,
                MatExpansionModule,
                MatGridListModule,
                MatLineModule,
                MatListModule,
                MatNativeDateModule,
                MatOptionModule,
                MatPaginatorModule,
                MatProgressSpinnerModule,
                MatRadioModule,
                MatRippleModule,
                MatSelectModule,
                MatSidenavModule,
                MatSliderModule,
                MatSlideToggleModule,
                MatSortModule,
                MatTableModule,
                MatTabsModule,

                */
//        OverlayContainer,
//        MatSelectionList,
        MatIconModule,
        MatProgressBarModule,
        MatMenuModule,
        MatButtonModule,
        MatTooltipModule,
        MatToolbarModule,
        MatCardModule,
        MatSnackBarModule,
        // material modules
    ],
    declarations: [
        NotifyComponent,
//      OverlayContainer,
        Loading,
        ThemeMenu,
        ThemeButton,
        TranslationMenu,
        TranslationButton,
        Http404,
    ],

    // do not need export providers
    providers: [
        Boot,
        ThemeService,
        NotifyService,
    ],
    exports: [
        CorifeusModule,
        // material modules
        /*
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatCommonModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatInputModule,
        MatLineModule,
        MatListModule,
        MatNativeDateModule,
        MatOptionModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
//        OverlayContainer,
//        MatSelectionList,
        // material modules
*/
        MatIconModule,
        MatProgressBarModule,
        MatMenuModule,
        MatButtonModule,
        MatTooltipModule,
        MatToolbarModule,
        MatCardModule,
        MatSnackBarModule,
        Loading,
        ThemeMenu,
        ThemeButton,
        TranslationMenu,
        TranslationButton,
        Http404,
    ],
    entryComponents: [
        NotifyComponent,
//        OverlayContainer,
    ]
})
export class CorifeusMaterialModule {

    constructor(boot: Boot) {
    }

    public static forRoot(): ModuleWithProviders<CorifeusMaterialModule> {
        return {
            ngModule: CorifeusMaterialModule,
//            providers: providers,
        };
    }
}
