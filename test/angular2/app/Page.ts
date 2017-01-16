import {
    Component,
    Injectable,
    ViewChild,
    ViewContainerRef,
    OnInit
} from '@angular/core';

import {CompileHtmlService } from '../../../src';

@Component({
    selector: 'p3x-ng2-compile-html-text',
    template: `
    <div #container>loading ...</div>
    <div [p3xCompileHtml]="data" [p3xCompileHtmlRef]="ref">loading ...</div>
`,
})
@Injectable()
export class Page implements OnInit {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    data: string;

    ref: Page;

    counter : number = 0;

    constructor( private compileHtmlService: CompileHtmlService ) {
        this.ref = this;
        this.update();
    }

    private update() {
        this.counter = this.counter + 1;
        this.data = `<div>Done</div><a href="javascript:void(0);" (click)="ref.alert('ok')">If click works it says OK!</a>${this.counter}`;
    }

    alert(string: string ) {
        alert(string);
        this.update();
    }

    ngOnInit() {
        this.compileHtmlService.compile({
            template: this.data,
            container: this.container,
            ref: this,
        })
    }

}