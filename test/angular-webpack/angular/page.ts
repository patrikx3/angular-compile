import {
    Component,
    Injectable,
    ViewChild,
    ViewContainerRef,
    OnInit
} from '@angular/core';

import {CompileHtmlService } from '../../../src';

@Component({
    selector: 'p3x-compile-test',
    template: `    
    <div #container></div>
    <hr/>
    <div [p3x-compile]="data2" [p3x-compile-ctx]="context"></div>
    `
})
@Injectable()
export class Page implements OnInit {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    data1: string;
    data2: string;

    context: Page;

    counter1 : number = 0;
    counter2 : number = 0;

    constructor( private compileHtmlService: CompileHtmlService ) {
      this.context = this;
    }

    private async update1() {
        this.counter1++;
        this.data1 = `
<div>Service</div><a id="button-container" href="javascript:void(0);" (click)="context.update1()">Click me via a service!</a>
<div id="counter-container">${this.counter1}</div>
`;
        this.compileHtmlService.compile({
            template: this.data1,
            container: this.container,
            context: this,
        })
    }

    private update2() {
        this.counter2++;
        this.data2 = `
<div>Attribute</div><a id="button-attribute" href="javascript:void(0);" (click)="context.update2()">Click me via an attribute!</a>
<div id="counter-attribute">${this.counter2}</div>
`;
    }
    ngOnInit() {
        this.update1();
        this.update2();
    }

}