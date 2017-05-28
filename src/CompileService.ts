import {
    Component,
    NgModule,
    Injectable,
    Compiler,
    ViewContainerRef,
    ModuleWithProviders,
    Type,
    Optional
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

export interface CompileOptions {
    template: string;
    container: ViewContainerRef;
    imports?: Array<Type<any> | ModuleWithProviders | any[]>;
    context?: any,
    onCompiled?: Function,
    onError?: Function;
    module?: NgModule;
}

const cache : any = {};

export class CompileServiceConfig {
    module: NgModule
}

let SingletonDefaultModule: NgModule;

@Injectable()
export class CompileService  {

    constructor(
        private compiler: Compiler,
        @Optional() config: CompileServiceConfig,
    ) {
        if (config !== undefined && config !== null) {
            if (config.module !== undefined && config.module !== null) {
                SingletonDefaultModule = config.module;
            }
        }
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

        if (Object.keys(cache).indexOf(cacheKey) > -1) {
            return cache[cacheKey];
        }

        cache[cacheKey] = (async() => {

            try {
                @Component({
                    template: opts.template
                })
                class TemplateComponent {
                    context: any
                }

                let module : NgModule = {};
                if (opts.module !== undefined) {
                    module = Object.assign({}, opts.module);
                } else if (SingletonDefaultModule !== undefined && SingletonDefaultModule !== null) {
                    module = Object.assign({}, SingletonDefaultModule);
                }
                module.imports = module.imports || [];
                module.imports.push( CommonModule );
                module.imports.push( BrowserModule );
                if (opts.imports !== undefined) {
                    module.imports = module.imports.concat(opts.imports)
                }
                if (module.declarations === undefined) {
                    module.declarations = [
                        TemplateComponent
                    ];
                } else {
                    module.declarations.push(TemplateComponent);
                }

                @NgModule(module)
                class TemplateModule {
                }
                const component = await this.compiler.compileModuleAndAllComponentsAsync(TemplateModule);
                const factory = component.componentFactories.find((comp) =>
                    comp.componentType === TemplateComponent
                );
                cache[cacheKey] = factory;
                if (opts.onCompiled) {
                    opts.onCompiled(component);
                }
                return factory;
            } catch (e) {
                delete cache[cacheKey];
                throw e;
            }
        })();

        return cache[cacheKey];
    }
}
