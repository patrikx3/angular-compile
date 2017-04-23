import {
    Component,
    NgModule,
    Injectable,
    Compiler,

} from '@angular/core';

import {CompileOptions} from "./Types";

const cache : any = {};

@Injectable()
export class CompileService  {

    constructor(
        private compiler: Compiler,
    ) {
    }

    public async compile(opts: CompileOptions) {

        try {
            const factory = await this.createFactory(opts);
            opts.container.clear();
            const cmp : any = opts.container.createComponent(factory);
            cmp.instance.context = opts.context;
        } catch (e) {
            if (opts.onError) {
                opts.onError(e)
            } else {
                console.error(e);
            }
        }
    }

    private async createFactory(opts: CompileOptions) {
        const cacheKey = opts.template;
        if (Object.keys(cache).includes(cacheKey)) {
            return cache[cacheKey];
        }
        cache[cacheKey] = new Promise(async(resolve) => {
            @Component({
                template: opts.template
            })
            class TemplateComponent {
                context: any
            }
            @NgModule({
                imports: opts.imports,
                declarations: [TemplateComponent]
            })
            class TemplateModule {
            }
            const component = await this.compiler.compileModuleAndAllComponentsAsync(TemplateModule);
            const factory = component.componentFactories.find((comp) =>
                comp.componentType === TemplateComponent
            );
            if (opts.onCompiled) {
                opts.onCompiled(component);
            }
            cache[cacheKey] = factory;

            resolve(factory);
        })
        return cache[cacheKey];

    }
}
