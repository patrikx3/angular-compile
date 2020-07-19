import {
    Injectable,
    OnDestroy
} from '@angular/core';

import {
    Router as AngularRouter,
    NavigationExtras,
    NavigationEnd,
} from '@angular/router';

const IsBot = require("../util/is-bot.js");

let debounceGoogleAnalyticsTimeout: any;

import {SettingsService} from './settings';
import { Subscription } from 'rxjs'
@Injectable()
export class RouterService implements OnDestroy {
    subscriptions$: Array<Subscription> = []

    analytics = false

    constructor(private router: AngularRouter,
                private settings: SettingsService
    ) {
        if (navigator.userAgent !== 'corifeus-server-renderer') {
            const startGa = () => {
                if (!IsBot()) {

                    window['gtag']('config', settings.data.core.integration.google.analytics,
                        {
                            'page_path': location.pathname
                        }
                    );

                    this.subscriptions$.push(
                        this.router.events.subscribe((event: any) => {
                            if (event instanceof NavigationEnd) {
                                clearTimeout(debounceGoogleAnalyticsTimeout);
                                debounceGoogleAnalyticsTimeout = setTimeout(() => {
                                    //console.log(event.urlAfterRedirects)
                                    window['gtag']('config', settings.data.core.integration.google.analytics,
                                        {
                                            'page_path': event.urlAfterRedirects
                                        }
                                    );
                                }, 333)
                            }
                        })
                    )
                }
            }

            setTimeout(() => {
                if (settings.data.core.hasOwnProperty('integration') && settings.data.core.integration.hasOwnProperty('google') && settings.data.core.integration.google.hasOwnProperty('analytics') && settings.data.core.integration.google.analytics !== '') {
                    const loadSettings = setInterval(() => {

                        if (window['gtag'] !== undefined) {
                            this.analytics = true
                            clearInterval(loadSettings)
                            startGa();
                        } else {
                            console.info('corifeus-web is waiting for gtag to be available')
                        }
                    }, 333)
                }
            })

        }
    };

    scrollToTop() {
        window.scrollTo(0, 0);
        const elements = document.querySelectorAll('[cdk-scrollable]');
        for (let i = 0; i < elements.length; ++i) {
            const element = elements[i];
            element.scrollTop = 0;
            //.scrollTo(0, 0);
        }
        const sideNavDivs = document.getElementsByTagName('mat-sidenav-content');
        for (let i = 0; i < sideNavDivs.length; i++) {
            const sideNavDiv = sideNavDivs[i];
            sideNavDiv.scrollTop = 0;
        }
    }

    navigateTop(commands: any[], extras?: NavigationExtras): Promise<boolean> {
        this.scrollToTop();
        return this.navigate(commands, extras);
    }

    navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
        return this.router.navigate(commands, extras);
    }

    get events() {
        return this.router.events;
    }

    ngOnDestroy(): void {
        this.subscriptions$.forEach(subs$ => subs$.unsubscribe())
    }

    public collectAnalytics(pagePath: string) {
        if (this.analytics) {
            window['gtag']('config', this.settings.data.core.integration.google.analytics,
                {
                    'page_path': pagePath
                }
            );
        }
    }
}
