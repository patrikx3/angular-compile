import {
    NgModule,
    ModuleWithProviders,
} from '@angular/core';



import {RouterModule} from '@angular/router';

import {
    HttpClientModule,
    HTTP_INTERCEPTORS
} from '@angular/common/http';


import {Boot} from './boot';

import {ColorService} from './services/color'

//import {JsonPipe} from '../src-save/pipe/json'
//import {KeysPipe} from '../src-save/pipe/keys'
//import {HtmlPipe} from '../src-save/pipe/html'

import {HttpShareService} from './services/http/http-share'
import {AuthInterceptor} from './services/http/auth-interceptor'

import {CookieService} from './services/cookie'
import {RouterService} from './services/router'
import {SettingsService} from './services/settings'
import {LocaleService} from './services/locale'
import {MediaQueryService} from './services/media-query'
import {IpInfoService} from './modules/ip-info'
import {AuthService,} from './modules/auth'


//import {FocusDirective} from '../src-save/directive/autofocus'

/***
 * NEVER USE A EXPORT * AS, NEED THE EXACT COMPONENT FOR INJECTABLE FUNCTION!!!!
 */

let booted = false

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule,
    ],
    // export
    declarations: [
//        KeysPipe,
//        HtmlPipe,
//        JsonPipe,
//        SubmittedRequired,
//        FocusDirective
    ],

    // does not need export
    providers: [
        RouterService,
        CookieService,
        SettingsService,
        LocaleService,
        MediaQueryService,
        HttpShareService,
        ColorService,

        // modules
        IpInfoService,
        AuthService,

        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },

        // order is important
        Boot,

    ],
    exports: [
        HttpClientModule,
        RouterModule,
//      KeysPipe,
//      HtmlPipe,
//      JsonPipe,
//      FocusDirective
//      SubmittedRequired,

    ],
    entryComponents: [],
})
export class CorifeusModule {

    constructor(private boot: Boot) {
        if (booted === true) {
            return
        }
        booted = true

        this.boot.boot();
    }

    public static forRoot(): ModuleWithProviders<CorifeusModule> {
        return {
            ngModule: CorifeusModule,
//            providers: providers,
        };
    }
}
