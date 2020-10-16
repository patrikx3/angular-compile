import {Component} from '@angular/core';
import {version} from '../../package.json';

import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    version = version

    data1: string;
    data2: string = 'init';

    data3: string = 'Just simple string <span style="color: red;">red</span>';

    counter1: number = 0;
    counter2: number = 0;

    interval: any;

    dataRouterLink: string = ''

    compileForm: string = ``

    dataMaterialDefault: string = `
    <button mat-button mat-flat-button color="primary" (click)="context.randomRouterLinkJit()">Generate new router link</button>
    `
    dataMaterial: string = `
    <button mat-button mat-flat-button color="primary" (click)="context.randomRouterLinkJit()">Generate new router link</button>
    `
    dataMaterialModule: any = {
        //                schemas: [CUSTOM_ELEMENTS_SCHEMA],
        //                declarations: [],
        imports: [
            MatButtonModule
        ],
        exports: []

    }

    constructor(
        //    private compileHtmlService: CompileService
    ) {
    }

    private update1() {
        this.counter1++;
        this.data1 = `
<div>P3X Angular Compile</div><button mat-button mat-flat-button color="accent" id="button-container" href="javascript:void(0);" (click)="context.update1()">Click me via a angular compile!</button>
<div id="counter-container">{{ context.counter1}}</div>
`;
    }

    public formClick() {
        alert('form click');
    }

    private update2() {
        this.counter2++;
        this.data2 = `
<div>Attribute</div><button  mat-button mat-flat-button color="accent" id="button-attribute" href="javascript:void(0);" (click)="context.update2()">Click me via an other attribute!</button>
<div id="counter-attribute">{{ context.counter2}}</div>
`;

    }

    chars: string = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    getRandomChar() {
        return this.chars[Math.floor(Math.random() * (62 - 0)) + 0]
    }

    randomRouterLinkPure() {
        let counter = 0;
        let randomString = '';

        while (counter < 10) {
            counter++;
            randomString += this.getRandomChar();
        }
        this.dataRouterLink = `<a  mat-button color="accent" href="javascript:void(0)" routerLink="${randomString}">${randomString}</a>`

    }

    randomRouterLinkJit() {
        let counter = 0;
        let randomString2 = '';

        while (counter < 10) {
            counter++;
            randomString2 += this.getRandomChar();
        }
        this.dataMaterial = `
${this.dataMaterialDefault} &nbsp; <a  mat-button color="accent" href="javascript:void(0)" routerLink="${randomString2}">${randomString2}</a>
`
    }

    ngOnInit() {
        this.update1();
        this.update2();
        this.randomRouterLinkPure()
        this.randomRouterLinkJit()
        /*
                let is = false;
                let newData = '<span>123</span>';
                let defaultData = '';
                let count = 0;

                this.interval = setInterval(() => {
                    is = !is;
                    if (is) {
                        count++;
                        defaultData = defaultData + newData;
                        this.data3 = defaultData + defaultData;
                        if (count > 10) {
                            count = 0;
                            defaultData = newData;
                        }
                    } else {
                        this.data3 = '<div>321</div>'
                    }
                }, 1000)
                */
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
