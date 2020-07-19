import {
    Injectable,
    Component,
    AfterViewInit,
    ViewChild,
    ElementRef,
    HostListener,
    Inject,
    OnDestroy,
} from '@angular/core';

import {ThemeService} from '../theme'
import {ColorService} from '../../../web'

import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

import { Subscription } from 'rxjs'
import {
    DomSanitizer
} from '@angular/platform-browser'


import {LocaleService, LocaleSubject} from '../../../web';

@Component({

    template: `
        <div style="position: relative;">
            <mat-icon color="accent" #elementIcon>{{ data.options.icon }}</mat-icon>
            &nbsp;
            <span #elementMessage class="message" [innerHTML]="transformHtml(data.message)"></span>
        </div>
        <a mat-button color="accent" #elementButton class="cory-mat-notify-button" (click)="ctx.dismiss()">{{ this.i18n.title.ok }}</a>

    `,

    styles: [`
        .message {
            position: relative;
            top: -6px;
        }

        [mat-button]{
            position: absolute;
            top: 10px;
            right: 4px;
            min-width: auto !important;
        }
    `],
})
@Injectable()
export class NotifyComponent implements AfterViewInit, OnDestroy {

    @ViewChild('elementButton', {read: ElementRef, static: false}) elementButton: ElementRef;
    @ViewChild('elementIcon', {read: ElementRef, static: false}) elementIcon: ElementRef;
    @ViewChild('elementMessage', {read: ElementRef, static: false}) elementMessage: ElementRef;

    inited: boolean = false;

    public data: { message: string, options: any };

    i18n: any;

    subscriptions$: Array<Subscription> = []

    constructor(
        public ctx: MatSnackBarRef<NotifyComponent>,
        private locale: LocaleService,
        private theme: ThemeService,
        private color: ColorService,
        @Inject(MAT_SNACK_BAR_DATA) data: any,
        private _sanitizer: DomSanitizer,
    ) {
        this.subscriptions$.push(
            this.locale.subscribe((subject: LocaleSubject) => {
                this.i18n = subject.locale.data.material;
            })
        )
        this.data = data;
    }


    calculateWidth() {
        const snackElement = <HTMLElement>document.getElementsByTagName('snack-bar-container')[0];
        //fixme cache the colors
        let backgroundColor = window.getComputedStyle(snackElement).getPropertyValue('background-color');
        let color = window.getComputedStyle(snackElement).getPropertyValue('color');
        let buttonColor = window.getComputedStyle(this.elementButton.nativeElement).color;
        let iconColor = window.getComputedStyle(this.elementIcon.nativeElement).color;
        buttonColor = this.color.getReadableColor(buttonColor, backgroundColor)
        iconColor = this.color.getReadableColor(iconColor, backgroundColor);
        color = this.color.getReadableColor(color, backgroundColor);
        this.elementIcon.nativeElement.style.color = iconColor;
        this.elementButton.nativeElement.style.color = buttonColor;
        this.elementMessage.nativeElement.style.color = color;

    }

    ngAfterViewInit() {
        /*
        this.subscriptions$.push(
            this.ctx.afterOpened().subscribe(() => {
                this.calculateWidth();
            })
        )
         */
    }

    onResize() {
        this.ctx.dismiss();
    }

    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: Event) {
//        if (!isDevMode()) {
        this.ctx.dismiss();
//        }
    }


    transformHtml(html: string): any {
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    ngOnDestroy(): void {
        this.subscriptions$.forEach(subs$ => subs$.unsubscribe())
    }
}
