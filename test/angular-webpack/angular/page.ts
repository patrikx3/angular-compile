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

@Component({
    selector: 'p3x-compile-test',
    template: `

        <!--        <cory-mat-loading [cory-visible]="true">sss</cory-mat-loading> -->

        <h3>Data1</h3>
        <div [p3x-compile]="data1" [p3x-compile-ctx]="this"></div>

        <hr/>

        <h3>Data2</h3>
        <div [p3x-compile]="data2" [p3x-compile-ctx]="this"></div>

        <hr/>

        <h3>Data3</h3>
        <div [p3x-compile]="data3" [p3x-compile-ctx]="this"></div>


        <hr/>
        Hidden is working? If show, below should say "Click me via a service!"
        <br/>
        <div *ngIf="false" [p3x-compile]="data2" [p3x-compile-ctx]="this"></div>
        <br/>
        If there was no "Click me via a service!" above, it works.

        <hr/>

        <h3>Data2 - This always visible</h3>
        <div *ngIf="true" [p3x-compile]="data2" [p3x-compile-ctx]="this"></div>
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

    constructor(
    //    private compileHtmlService: CompileService
    ) {
    }

    private update1() {
        this.counter1++;
        this.data1 = `
<div>Service</div><a id="button-container" href="javascript:void(0);" (click)="context.update1()">Click me via a service!</a>
<div id="counter-container">{{ context.counter1}}</div>
`;
    }

    private update2() {
        this.counter2++;
        this.data2 = `
<div>Attribute</div><a id="button-attribute" href="javascript:void(0);" (click)="context.update2()">Click me via an attribute!</a>
<div id="counter-attribute">{{ context.counter2}}</div>
`;

    }

    ngOnInit() {
        this.update1();
        this.update2();
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