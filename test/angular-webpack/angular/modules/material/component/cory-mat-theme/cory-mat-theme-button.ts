import {
    Component,
    Input,
    OnDestroy,
} from '@angular/core';

import { Subscription } from 'rxjs'

import {
    LocaleService, SettingsService, LocaleSubject,
    MediaQueryService, MediaQuerySettingType, MediaQuerySetting
} from "../../../web";

// requires to be in a mat-menu
@Component({
    selector: 'cory-mat-theme-button',
    template: `

        <mat-menu x-position="before" #menuTheme="matMenu">
            <cory-mat-theme-menu></cory-mat-theme-menu>
        </mat-menu>

        <button [color]="color" #buttonTheme mat-button [matMenuTriggerFor]="menuTheme" [matTooltip]="tooltip" [matTooltipPosition]="matTooltipPosition">
            <mat-icon>format_color_fill</mat-icon>
            <span class="cory-mat-hide-xsmall">
            {{ i18n.material.title.theme }}
            </span>
        </button>
`,
})
export class ThemeButton implements OnDestroy {

    subscriptions$: Array<Subscription> = []

    @Input('cory-tooltip-position')
    matTooltipPosition: string = "left";

    @Input('color')
    color: string = 'default';


    i18n: any;

    settings: any;

    tooltip: string;

    currentWidthAlias: string;

    constructor(
        protected locale: LocaleService,
        protected settingsAll: SettingsService,
        private mediaQuery: MediaQueryService
    ) {
        this.settings = settingsAll.data.material;

        this.subscriptions$.push(
            this.locale.subscribe((data: LocaleSubject) => {
                this.i18n = data.locale.data;
                this.setTooltip();
            })
        )

        this.subscriptions$.push(
            this.mediaQuery.subscribe((settings: MediaQuerySetting[]) => {
                settings.forEach((setting) => this.setTooltip(setting.name))
            })
        )
    }

    private setTooltip(alias?: string) {
        if (alias !== undefined) {
            this.currentWidthAlias = alias;
        }
        switch (this.currentWidthAlias) {
            case 'small':
                this.tooltip = this.locale.data.material.title.theme;

                break;

            case 'large':
                this.tooltip = undefined;
                break;
        }

    }

    ngOnDestroy(): void {
        this.subscriptions$.forEach(subs$ => subs$.unsubscribe())
    }
}
