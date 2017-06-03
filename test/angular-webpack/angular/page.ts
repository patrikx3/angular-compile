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

import {CompileService } from '../../../src';

@Component({
    selector: 'p3x-compile-test',
    template: `
        <div [p3x-compile]="data3" [p3x-compile-ctx]="this"></div>
        <div [p3x-compile]="data3" [p3x-compile-ctx]="this"></div>
        <div [p3x-compile]="data3" [p3x-compile-ctx]="this"></div>

    <div #container></div>

    <div #container2></div>
    <hr/>
    <div [p3x-compile]="data2" [p3x-compile-ctx]="this"></div>

    <div [p3x-compile]="data2" [p3x-compile-ctx]="this"></div>

    <div [p3x-compile]="data2" [p3x-compile-ctx]="this"></div>

    <div [p3x-compile]="data2" [p3x-compile-ctx]="this"></div>
        
    <hr/>
    Hidden
    <div *ngIf="false" [p3x-compile]="data2" [p3x-compile-ctx]="this"></div>
    <div></div>
    (you should nothing above, only hidden)
    <div></div>
    <hr/>
    Visible
    <div *ngIf="true" [p3x-compile]="data2" [p3x-compile-ctx]="this"></div>

        
`
})
@Injectable()
export class Page implements OnInit, OnDestroy {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    @ViewChild('container2', {read: ViewContainerRef}) container2: ViewContainerRef;

    data1: string;
    data2: string;

    data3: string = 'here content of your file';

    counter1 : number = 0;
    counter2 : number = 0;

    interval: any;

    constructor( private compileHtmlService: CompileService ) {
    }

    private async update1() {
        this.counter1++;
        this.data1 = `
<div>Service</div><a id="button-container" href="javascript:void(0);" (click)="context.update1()">Click me via a service!</a>
<div id="counter-container">{{ context.counter1}}</div>
`;
        Promise.all([
            this.compileHtmlService.compile({
                template: this.data1,
                container: this.container,
                context: this,
                onCompiled: (cmp : any) => {
                    console.log('container1 compiled, same template ');
                }

            })
            ,
            this.compileHtmlService.compile({
                template: this.data1,
                container: this.container2,
                context: this,
                onCompiled: (cmp : any) => {
                    console.log('container2 compiled, same template');
                }
            })

        ])
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

        let is = false;
        let newData = '<span>123</span>';
        let defaultData = '';
        let count = 0;
        /*
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