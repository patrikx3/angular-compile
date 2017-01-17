import {
    Component,
    Compiler, NgModule,
    Injectable
} from '@angular/core';
import {CompileHtmlServiceOptions} from "./CompileHtmlServiceOptions";

@Injectable()
export class CompileHtmlService  {

    constructor(private compiler: Compiler) {}

    public compile(opts: CompileHtmlServiceOptions) {

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
    }
}