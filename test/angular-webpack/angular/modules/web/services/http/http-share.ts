import {Injectable} from '@angular/core';

let booted = false;

const data = {
    token: '',
};

import {Token} from '../../modules/auth';


import {CookieService} from '../cookie';
import {SettingsService} from '../settings';

const cookie: CookieService = new CookieService();
const settings: SettingsService = new SettingsService();

export class HttpShareService {
    constructor() {
    }


    public get requestCount() {
        return window.corifeus.core.http.counter;
    }

    public get token() {
        if (!booted) {
            booted = true;
            data.token = cookie.get(settings.data.core.cookie.token);
        }
        return data.token;
    }

    public set token(value) {
        booted = true;
        data.token = value;
        const cookieSettings: Cookies.CookieAttributes = {};
        cookieSettings.expires = new Date(this.tokenInfo.expiry);
        cookie.set(settings.data.core.cookie.token, value, cookieSettings);
    }

    public get tokenInfo(): any {
        return Token(this.token);
    }


}

