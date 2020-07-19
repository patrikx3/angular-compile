import {
    Component,
    Inject,
    OnDestroy,
} from '@angular/core';

import {
    LocaleService, SettingsService, LocaleSubject
} from "../../../web";

import {
    ThemeService
} from '../../services/theme';

import {
    NotifyService
} from '../../services/notify/notify';

import {template} from 'lodash';

import { Subscription } from 'rxjs'

// requires to be in a mat-menu
@Component({
    selector: 'cory-mat-theme-menu',
    template: `
    <button mat-menu-item disabled>
        {{ i18n.title.theme }}
    </button>
    <div class="cory-mat-menu-divider"></div>
    <button mat-menu-item
            *ngFor="let thisTheme of themeLight"
            (click)="this.clickChangeTheme(thisTheme)"
            [class.cory-mat-menu-item-active]="thisTheme == theme.current"
    >
        {{ i18n.themes.material[thisTheme] }}
    </button>
    <div class="cory-mat-menu-divider"></div>
    <button mat-menu-item
            *ngFor="let thisTheme of themeDark"
            (click)="this.clickChangeTheme(thisTheme)"
            [class.cory-mat-menu-item-active]="thisTheme == theme.current"
    >
        {{ i18n.themes.material[thisTheme] }}
    </button>
`,
})
export class ThemeMenu implements OnDestroy {

    subscriptions$: Array<Subscription> = []

    i18n: any;

    settings: any;

    constructor(
        private notify: NotifyService,
        public theme: ThemeService,
        public locale: LocaleService,
        protected settingsAll: SettingsService
    ) {
        this.settings = settingsAll.data.material;

        this.subscriptions$.push(
            this.locale.subscribe((data: LocaleSubject) => {
                this.i18n = data.locale.data.material;
            })
        )
    }

    public clickChangeTheme(theme: string) {

        try {
            const oldTheme = this.theme.current;
            this.theme.setTheme(theme)
            const parameters = ({
                old: this.i18n.themes.material[oldTheme],
                'current': this.i18n.themes.material[theme]
            });
            const templateFactory = template(this.i18n.message.theme.changed);
            this.notify.info(templateFactory(parameters));
        } catch (e) {
            this.notify.error(e);
        }
    }

    public get themeLight() {
        return this.settings.themes.material.filter((theme: string) => {
            return theme.startsWith('cory-mat-theme-light')
        })
    }

    public get themeDark() {
        return this.settings.themes.material.filter((theme: string) => {
            return theme.startsWith('cory-mat-theme-dark')
        })
    }

    ngOnDestroy(): void {
        this.subscriptions$.forEach(subs$ => subs$.unsubscribe())
    }
}
