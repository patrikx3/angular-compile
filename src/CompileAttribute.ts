import {Directive, Input, Injectable, ViewContainerRef, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import { CompileService } from './CompileService';

@Directive({ selector: '[p3x-compile]' })
@Injectable()
export class CompileAttribute implements OnInit, OnChanges{

    @Input('p3x-compile')
    html: string;

    @Input('p3x-compile-ctx')
    context: any;

    @Input('p3x-compile-imports')
    imports: any[];

    async update() {
        if (this.html === undefined) {
            return;
        }
        await this.service.compile({
            template: this.html,
            container: this.container,
            context: this.context,
            imports: this.imports
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
        private service: CompileService
    ) {}
}