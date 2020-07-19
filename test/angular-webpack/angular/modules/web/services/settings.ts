import {
    Injectable
} from '@angular/core';

import {log as defulatLog} from '../util/log';

const log = defulatLog.factory('settings');

let totalSettings: any = {};
let extendSettings: any = {};


@Injectable()
export class SettingsService {

    constructor() {

    }

    public register(module: string, settings: any) {
        log(`[${module.toUpperCase()}] register`)
       // if (totalSettings[module] !== undefined) {
       //     throw new Error(`Already registered setting module (${module})`);
       // }
        totalSettings[module] = Object.assign(totalSettings[module] || {}, settings)

        if (extendSettings[module] !== undefined && extendSettings[module].length > 0 ) {
            for(let extendSetting of extendSettings[module]) {
                totalSettings[module] = Object.assign(totalSettings[module], extendSetting)
            }
        }
        log(`[${module.toUpperCase()}] registered`, totalSettings)
    }

    public extend(module: string, settings: any) {
        if (totalSettings[module] === undefined) {
            log(`[${module.toUpperCase()}] extend not ready, waiting for register`, settings)
            extendSettings[module] = extendSettings[module] || [];
            extendSettings[module].push(settings)
            return;
        }
        log(`[${module.toUpperCase()}] extend`, settings)
        totalSettings[module] = Object.assign(totalSettings[module], settings)
        log(`[${module.toUpperCase()}] done`, totalSettings)
    }

    get data(): any {
        return totalSettings;
    }

    boot() {

    }

    afterInitWaiter: any;
    afterInit() {
        log('afterInit');
        const coreSettings = totalSettings['core'];

        if (coreSettings === undefined) {
            log('afterInit waiting for construction')
            this.afterInitWaiter = setTimeout(() => {
                this.afterInit()
            })
            return
        }

        if (coreSettings.hasOwnProperty('integration')) {
            log('afterInit - integration');
            const head = document.getElementsByTagName("head")[0];

            // yandex
            if (coreSettings.integration.hasOwnProperty('yandex')) {
                log('afterInit - integration - yandex');

                // yandex-verification
                if (coreSettings.integration.yandex.hasOwnProperty('verification')) {
                    log('afterInit - integration - yandex - verification');
                    const meta = document.createElement('meta');
                    meta.name = "yandex-verification";
                    meta.content = coreSettings.integration.yandex['verification'];
                    head.appendChild(meta);

                }
            }

            // google
            if (coreSettings.integration.hasOwnProperty('google')) {
                log('afterInit - integration - google');

                // google-site-verification
                if (coreSettings.integration.google.hasOwnProperty('site-verification')) {
                    log('afterInit - integration - google - site-verification');
                    const meta = document.createElement('meta');
                    meta.name = "google-site-verification";
                    meta.content = coreSettings.integration.google['site-verification'];
                    head.appendChild(meta);
                }

                // google analytics
                if (coreSettings.integration.google.hasOwnProperty('analytics')) {
                    log('afterInit - integration - google - analytics');

                    const script = document.createElement("script");
                    script.type = 'text/javascript';
                    script.async = true
                    script.src = `https://www.googletagmanager.com/gtag/js?id=${coreSettings.integration.google.analytics}`
                    head.appendChild(script);

                    const scriptInline =document.createElement("script");
                    scriptInline.type = 'text/javascript';
                    scriptInline.innerHTML = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${coreSettings.integration.google.analytics}');
`
                    head.appendChild(scriptInline);

                    log('afterInit - integration - google - analytics - load script');
                }
            }

            // microsoft
            if (coreSettings.integration.hasOwnProperty('microsoft')) {
                log('afterInit - integration - google - microsoft');

                // msvalidate.01 / bing
                if (coreSettings.integration.microsoft.hasOwnProperty('msvalidate.01')) {
                    log('afterInit - integration - google - microsoft - msvalidate');
                    const meta = document.createElement('meta');
                    meta.name = "msvalidate.01";
                    meta.content = coreSettings.integration.microsoft['msvalidate.01'];
                    head.appendChild(meta);

                }
            }
        }
    }
}
