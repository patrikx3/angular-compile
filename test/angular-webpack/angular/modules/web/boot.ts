import {
    Injectable,
    Inject,

} from '@angular/core';

import {PlatformLocation} from '@angular/common'

import {log as defaultLog} from './util/log';
const IsBot = require("./util/is-bot.js");

const log = defaultLog.factory('boot');

declare global {
    interface Window {
        corifeusLoader: number,
        corifeus: {
            booted: boolean,
            app: {
                web: any,
                server: any
            }
            core: {
                http: {
                    counter: number,
                    status: number,
                    counterUrlMap: any,
                    error: Array<any>
                }
            }
        };
    }
}


window.corifeusLoader = 0
window.corifeus = {
    booted: false,
    core: {
        http: {
            status: 200,
            counter: 0,
            counterUrlMap: {},
            error: [],
        }
    },
    app: {
        web: {},
        server: {}
    }
}

let httpCounter = 0;
Object.defineProperty(window.corifeus.core.http, 'counter', {
    get: () => {
        return httpCounter;
    },
    set: (value) => {
        httpCounter = value;
    }
})

import {SettingsService, LocaleService} from "./";
import {RouterService} from "./services/router";


@Injectable()
export class Boot {

    constructor(
        private settings: SettingsService,
        private locale: LocaleService,
        private routerService: RouterService,
        private location: PlatformLocation
    ) {
    }

    boot() {
        log('booted');
        this.settings.boot();

        const module = 'core';

        const body = document.getElementsByTagName("body")[0];
        const corySeo = document.createElement('div');
        body.appendChild(corySeo)
        corySeo.id = 'cory-seo';

        this.settings.register(module, require('./json/settings.json'));

        // after settings
        this.locale.boot();

        if (!IsBot()) {
            corySeo.style.display = 'none';
        }
        window.corifeus.booted = true;

        this.location.onPopState(() => {
            this.routerService.scrollToTop();
        });

    }
}
