import {Directive, Input, Injectable, ViewContainerRef, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import { CompileHtmlService } from './CompileHtmlService';

@Directive({ selector: '[p3xCompileHtml]' })
@Injectable()
export class CompileHtmlAttribute implements OnInit, OnChanges{

    @Input('p3xCompileHtml') p3xHtml: string;

    @Input() p3xCompileHtmlRef: any;

    @Input() p3xCompileHtmlImports: any[];

    update() {
        this.service.compile({
            template: this.p3xHtml,
            container: this.container,
            ref: this.p3xCompileHtmlRef,
            imports: this.p3xCompileHtmlImports
        })
    }

    ngOnInit() {
        this.update();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.update();
    }

    constructor(
        private container: ViewContainerRef,
        private service: CompileHtmlService
    ) {}
}