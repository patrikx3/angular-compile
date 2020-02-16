import {
    Component,
    Injectable,
    ViewChild,
    ViewContainerRef,
    OnInit,
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA,
    OnDestroy
} from '@angular/core';


import {
    MatButtonModule,
} from '@angular/material/button';


@Component({
    selector: 'p3x-compile-test',
    template: `
<div style="margin-top: 10px; margin-bottom: 10px; max-width: 700px; margin-left: auto; margin-right: auto; padding-left: 10px; padding-right: 10px;">
    <mat-card>
        <div style="float: right">
            <cory-mat-translation-button></cory-mat-translation-button>
            <br/>
            <cory-mat-theme-button ></cory-mat-theme-button>
        </div>

        <h1>P3X Angular Compile Example</h1>

        <a class="mat-title" href="https://pages.corifeus.com/angular-compile">Corifeus.com Wiki</a>
        <br/>
        <a href="https://github.com/patrikx3/angular-compile/blob/master/test/angular-webpack/angular/page.ts">How it works from the code in GitHub, some examples</a>

        <br/>
        <br/>
        <strong>Go ahead and inspect the elements and click away!!!</strong>

        <br/>
        <br/>
        <mat-divider></mat-divider>

        <h3>Template 1</h3>
        <div [p3x-compile]="data1" [p3x-compile-ctx]="this" class="p3x-angular-compile-element"></div>

        <br/>
        <br/>
        <mat-divider></mat-divider>

        <h3>Template 2</h3>
        <div [p3x-compile]="data2" [p3x-compile-ctx]="this" class="p3x-angular-compile-element"></div>

        <br/>
        <br/>
        <mat-divider></mat-divider>

        <h3>Template 3</h3>
        <div [p3x-compile]="data3" [p3x-compile-ctx]="this" class="p3x-angular-compile-element"></div>

        <br/>
        <br/>
        <mat-divider></mat-divider>

        <h3>Template 4 - Re-use the same context</h3>
        <div *ngIf="true" [p3x-compile]="data2" [p3x-compile-ctx]="this" class="p3x-angular-compile-element"></div>


        <br/>
        <br/>
        <mat-divider></mat-divider>

        <h3>Pure Router Link with JIT Angular</h3>
        <button mat-button mat-raised-button color="primary" (click)="randomRouterLink()">Generate new router link</button>
        &nbsp;
        <span [p3x-compile]="dataRouterLink" [p3x-compile-ctx]="this" class="p3x-angular-compile-element"></span>

        <br/>
        <br/>
        <mat-divider></mat-divider>
        <br/>

        <h3>Router Link with p3x-angular-compile</h3>
        <div [p3x-compile]="dataMaterial" [p3x-compile-ctx]="this" [p3x-compile-module]="dataMaterialModule" class="p3x-angular-compile-element"></div>

    </mat-card>
</div>
    `
})
@Injectable()
export class Page implements OnInit, OnDestroy {

    data1: string;
    data2: string = 'init';

    data3: string = 'Just simple string <span style="color: red;">red</span>';

    counter1: number = 0;
    counter2: number = 0;

    interval: any;

    dataRouterLink: string = ''

    compileForm: string = ``

    dataMaterialDefault: string = `
    <button mat-button mat-raised-button color="primary" (click)="context.randomRouterLink()">Generate new router link</button>
    `
    dataMaterial: string = `
    <button mat-button mat-raised-button color="primary" (click)="context.randomRouterLink()">Generate new router link</button>
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
<div>P3X Angular Compile</div><a id="button-container" href="javascript:void(0);" (click)="context.update1()">Click me via a angular compile!</a>
<div id="counter-container">{{ context.counter1}}</div>
`;
    }

    public formClick() {
        alert('form click');
    }

    private update2() {
        this.counter2++;
        this.data2 = `
<div>Attribute</div><a id="button-attribute" href="javascript:void(0);" (click)="context.update2()">Click me via an other attribute!</a>
<div id="counter-attribute">{{ context.counter2}}</div>
`;

    }

    chars: string = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    getRandomChar() {
        return this.chars[Math.floor(Math.random() * (62 - 0)) + 0]
    }

    randomRouterLink() {
        let counter = 0;
        let randomString = '';
        let randomString2 = '';

        while (counter < 10) {
            counter++;
            randomString += this.getRandomChar();
            randomString2 += this.getRandomChar();
        }
        this.dataRouterLink = `<a href="javascript:void(0)" routerLink="${randomString}">${randomString}</a>`
        this.dataMaterial = `
${this.dataMaterialDefault} &nbsp; <a href="javascript:void(0)" routerLink="${randomString2}">${randomString2}</a>
`
    }

    ngOnInit() {
        this.update1();
        this.update2();
        this.randomRouterLink()
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
