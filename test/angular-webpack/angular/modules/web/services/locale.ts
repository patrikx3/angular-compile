import {
    Injectable,

    Inject
} from '@angular/core';

//import * as moment from 'moment';

import {CookieService,} from '../services/cookie';
import {SettingsService} from '../services/settings';
import {IpInfoService,} from '../modules/ip-info';

import {log as logDefault} from '../util/log'

const log = logDefault.factory('locale');

let currentLanguage = 'en';

const totalTranslations = {};

import {BehaviorSubject} from 'rxjs';

const subject = new BehaviorSubject(<LocaleSubject>{
    action: 'empty'
});

export interface LocaleSubject {
    action: string
    locale: LocaleService,
}

let cookieEmpty = true;

const IsBot = require("../util/is-bot.js");

@Injectable()
export class LocaleService {

    constructor(
        private ipInfo: IpInfoService,
        private settings: SettingsService,
        private cookie: CookieService,
    ) {

    }

    public async boot() {

        const fromCookie = this.cookie.get(this.settings.data.core.cookie.language);
        if (fromCookie !== undefined) {
            log(`using cookie language: ${fromCookie}`)
            this.setTranslation(fromCookie);
        } else if (!IsBot()) {

            let ipLanguage;
            try {
                const response: any = await this.ipInfo.get;
                if (!response.hasOwnProperty('country')) {
                    this.setTranslation(currentLanguage);
                    return;
                }
                ipLanguage = response.country.toLowerCase()
                if (Object.keys(this.settings.data.core.translations.language).indexOf(ipLanguage) > -1) {
                    log(`using locale from IPINFO ${ipLanguage}`)
                    this.setTranslation(ipLanguage);
                }
            } catch (e) {
                window.corifeus.core.http.error.push(e);
                console.error(e)
            }
            if (ipLanguage === undefined) {
                log(`using default language: ${ipLanguage}`)
                this.setTranslation(currentLanguage);
            }
        } else {
            this.setTranslation(currentLanguage);
        }
    }

    public register(module: string, translations: any) {
        log(`[ ${module.toUpperCase()} ]`)
        Object.keys(translations).forEach((lang: string) => {
            totalTranslations[lang] = totalTranslations[lang] || {};

           // if (totalTranslations[lang][module] !== undefined) {
           //     throw new Error(`Already registered locale langauge module (${module})`);
           // }
            totalTranslations[lang][module] = translations[lang];

        })
        subject.next({
            action: 'set-translation',
            locale: this
        })
    }

    public setTranslation(setTranslation: string) {
        log(`setTranslation '${setTranslation}'`)
        if (this.settings.data.core.translations.language.hasOwnProperty(setTranslation)) {
            currentLanguage = setTranslation;
            this.cookie.set(this.settings.data.core.cookie.language, currentLanguage);

            subject.next({
                action: 'set-translation',
                locale: this
            })
            //moment.locale(currentLanguage);
            cookieEmpty = false;
            return true;
        }
        throw new Error(`setTranslation '${setTranslation}' failed`);
    }

    public subscribe(subscriber: any) {
        return subject.subscribe({
            next: subscriber
        });
    }

    public get current() {
        return currentLanguage;
    }

    public get data() {
        return totalTranslations[currentLanguage];
    }

}

