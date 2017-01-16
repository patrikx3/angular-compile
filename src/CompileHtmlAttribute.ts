import {Directive, Input, Injectable, ViewContainerRef, OnInit} from '@angular/core';

import { CompileHtmlService } from './CompileHtmlService';

@Directive({ selector: '[p3xCompileHtml]' })
@Injectable()
export class CompileHtmlAttribute {

    @Input('p3xCompileHtml') p3xHtml: string;

    @Input() p3xCompileHtmlRef: any;

    ngOnInit() {
        this.service.compile({
            template: this.p3xHtml,
            container: this.container,
            ref: this.p3xCompileHtmlRef
        })
    }

    constructor(
        private container: ViewContainerRef,
        private service: CompileHtmlService
    ) {}
}