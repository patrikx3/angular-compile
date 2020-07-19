import {
    Injectable,
} from '@angular/core';

import {kebabCase} from 'lodash';

import {SettingsService, CookieService} from '../../web';

//import {OverlayContainer} from '@angular/material';

export type ThemeType = "dark" | "light";


@Injectable()
export class ThemeService {

    public current: string;

    private original: string;

    private all: string[];

    private settings: any;

    public type: ThemeType;

    public usingCookie = false;

    constructor(
        private cookies: CookieService,
        private settingsAll: SettingsService,
        //        private overlayContainer: OverlayContainer
    ) {
    }

    boot() {
        this.settings = this.settingsAll.data.material;

        this.original = this.settings.themes.material[0]
        this.current = this.original;

        this.all = this.settings.themes.material.map((element: string) => {
            return kebabCase(element)
        })

        const fromCookie = this.cookies.get(this.settings.cookie.theme);
        try {
            if (fromCookie !== undefined) {
                this.usingCookie = true;
                this.setTheme(fromCookie);
            } else {
                this.setTheme(this.original);
            }
        } catch (e) {
            this.setTheme(this.original);
        }

    }

    setTheme(newTheme: string) {
        newTheme = kebabCase(newTheme);
        if (this.all.indexOf(newTheme) > -1) {
            const body = document.getElementsByTagName("body")[0];

            body.classList.remove(this.current);
//            this.overlayContainer.getContainerElement().classList.remove(this.current);

            this.current = newTheme;
            body.classList.add(this.current);
//            this.overlayContainer.getContainerElement().classList.add(this.current);

            //this.overlayContainer.themeClass = newTheme;
            this.cookies.set(this.settings.cookie.theme, this.current);

            if (this.current.startsWith('cory-mat-theme-dark')) {
                this.type = "dark";
                body.classList.add('cory-mat-theme-dark');
                body.classList.remove('cory-mat-theme-light');
            } else {
                this.type = "light";
                body.classList.add('cory-mat-theme-light')
                body.classList.remove('cory-mat-theme-dark');
            }
            return;
        }
        throw new Error(`undefined ${newTheme}`);
    }


}
