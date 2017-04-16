import {
    Component,
    Compiler, NgModule,
    Injectable,
    Injector,
    ReflectiveInjector
} from '@angular/core';
import { COMPILER_PROVIDERS }  from '@angular/compiler';

import {CompileHtmlServiceOptions} from "../typings/CompileHtmlServiceOptions";


@Injectable()
export class CompileHtmlService  {

    private injector: Injector;
    private compiler: Compiler;

    constructor(injector: Injector) {
        this.injector = ReflectiveInjector.resolveAndCreate(COMPILER_PROVIDERS, injector);
        this.compiler = this.injector.get(Compiler);
    }

    public compile(opts: CompileHtmlServiceOptions) {

        try {
            @Component({
                template: opts.template || ''
            })
            class TemplateComponent {
                ref = opts.ref;
            }
            @NgModule({
                imports: opts.imports,
                declarations: [TemplateComponent]
            })
            class TemplateModule {}
            const compiled = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
            const factory = compiled.componentFactories.find((comp) =>
                comp.componentType === TemplateComponent
            );
            opts.container.clear();
            opts.container.createComponent(factory);

        } catch (e) {
            console.error(e);
        }
    }
}