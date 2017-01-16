import {
    Component,
    Injectable,
    ViewChild,
    ViewContainerRef,
    AfterViewInit
} from '@angular/core';


import { CompileHtmlService } from '../../../src/CompileHtmlService';

@Component({
    selector: 'p3x-ng2-compile-html',
    template: `<div #container></div>`,
})
@Injectable()
export class Page implements AfterViewInit{

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    constructor( private compileHtmlService: CompileHtmlService ) {}

    alert(string: string ) {
        alert(string);
    }

    ngAfterViewInit() {

        this.compileHtmlService.compile({
            template: `<a href="javascript:void(0);" (click)="ref.alert('ok')">If click works it says OK!</a>`,
            container: this.container,
            ref: this,
        })
    }

}