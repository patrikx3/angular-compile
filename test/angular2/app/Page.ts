import {
    Component,
    Injectable,
    ViewChild,
    ViewContainerRef,
    OnInit
} from '@angular/core';

import {CompileHtmlService } from '../../../src';

@Component({
    selector: 'p3x-ng2-compile-html',
    template: `
    <div #container>loading ...</div>
    <div [p3xCompileHtml]="data" [p3xCompileHtmlRef]="ref">loading ...</div>
`,
})
@Injectable()
export class Page implements OnInit {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    data: string = `<div>Done</div><a href="javascript:void(0);" (click)="ref.alert('ok')">If click works it says OK!</a>`;

    ref: Page;

    constructor( private compileHtmlService: CompileHtmlService ) {
        this.ref = this;
    }

    alert(string: string ) {
        alert(string);
    }

    ngOnInit() {
        this.compileHtmlService.compile({
            template: this.data,
            container: this.container,
            ref: this,
        })
    }

}