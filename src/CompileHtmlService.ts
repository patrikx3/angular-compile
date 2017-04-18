import {
    Component,
    NgModule,
    Injectable,
    Compiler,
    ReflectiveInjector
} from '@angular/core';

import {CompileHtmlServiceOptions} from "./CompileHtmlServiceOptions";


@Injectable()
export class CompileHtmlService  {

    // TODO add in cache - enable/disable
    constructor(private compiler: Compiler) {
    }

    public async compile(opts: CompileHtmlServiceOptions) {

        try {
            const componentDecorator = {
                selector: 'p3x-dynamic-component',
                template: opts.template || '',
                styles: [``],
            };
            const metadata = new Component(componentDecorator);
            const cmpClass = class {
                context = opts.context
            }
            const decoratedCmp = Component(metadata)(cmpClass);

            @NgModule({
                imports: opts.imports,
                declarations: [
                    decoratedCmp,
                ],
                entryComponents: [
                    decoratedCmp
                ]
            })
            class TemplateModule {}

            const compiled = await this.compiler.compileModuleAndAllComponentsAsync(TemplateModule);
            const factory = compiled.componentFactories.find((comp) =>
                comp.componentType === decoratedCmp
            );
            opts.container.clear();
            const injector = ReflectiveInjector.fromResolvedProviders([], opts.container.parentInjector);
            const cmpRef = opts.container.createComponent(factory, -1, injector, []);
            if (opts.onCompiled) {
                opts.onCompiled(factory);
            }
        } catch (e) {
            if (opts.onError) {
                opts.onError(e)
            } else {
                console.error(e);
            }
        }
    }
}