import {
    Component,
    Input,
    OnDestroy,
} from '@angular/core';

import {
    LocaleService, SettingsService, LocaleSubject,
    MediaQueryService, MediaQuerySettingType, MediaQuerySetting
} from "../../../web";

import { Subscription } from 'rxjs'

// requires to be in a mat-menu
@Component({
    selector: 'cory-mat-translation-button',
    template: `

<mat-menu x-position="before"  #menuTranslate="matMenu">
<cory-mat-translation-menu></cory-mat-translation-menu>
</mat-menu>

<button  [color]="color" mat-button [matMenuTriggerFor]="menuTranslate" [matTooltip]="tooltip"  [matTooltipPosition]="matTooltipPosition">
<mat-icon>language</mat-icon>
<span class="cory-mat-hide-xsmall">
    {{ i18n.material.title.language }}
</span>
</button>

`,
})
export class TranslationButton implements OnDestroy {

    subscriptions$: Array<Subscription> = []

    @Input('color')
    color: string = 'default';

    @Input('cory-tooltip-position')
    matTooltipPosition: string = 'left';

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
                this.tooltip = this.locale.data.material.title.language;

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
