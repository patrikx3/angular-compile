import {
    Compiler,
    Component,
    inject,
    Injectable,
    Input,
    ModuleWithProviders,
    NgModule,
    NgModuleFactory,
    OnChanges,
    SimpleChanges,
    Type,
} from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';

function reverse(str: string) {
    return str.split('').reverse().join('');
}

function random() {
    return (
        Math.floor(Math.random() * (99999999999999999 - 10000000000000000)) +
        10000000000000000
    ).toString(16);
}

let currentIdTime: number;
let currentId = 0;

function nextId(): string {
    const now = Date.now();
    if (currentIdTime !== now) {
        currentId = 0;
        currentIdTime = now;
    }
    const comingId = ++currentId;
    const randomHex = reverse(random()).padStart(15, '0');
    const timeHex = reverse(currentIdTime.toString(16).padStart(12, '0'));
    const comingIdHex = reverse(comingId.toString(16).padStart(3, '0'));
    return `p3x-angular-compile-${timeHex}${comingIdHex}${randomHex}`;
}

@Component({
    selector: '[p3x-compile]',
    template: `
        @if (renderComponent) {
          <ng-container *ngComponentOutlet="dynamicComponent; ngModuleFactory: dynamicModule;"></ng-container>
        }
    `,
    standalone: true,
    imports: [CommonModule, NgComponentOutlet],
})
@Injectable()
export class CompileAttribute implements OnChanges {

    @Input('p3x-compile')
    html!: string;

    @Input('p3x-compile-ctx')
    context: any;

    @Input('p3x-compile-error-handler')
    errorHandler: Function | undefined = undefined;

    dynamicComponent: any;
    dynamicModule: NgModuleFactory<any> | any;

    @Input('p3x-compile-module')
    module: NgModule | undefined;

    @Input('p3x-compile-imports')
    imports: Array<Type<any> | ModuleWithProviders<any> | any[]> | undefined;

    private readonly compiler = inject(Compiler);

    get renderComponent() {
        return typeof this.html === 'string' && this.html.trim() !== '';
    }

    ngOnChanges(_changes: SimpleChanges) {
        this.update();
    }

    update() {
        try {
            if (this.html === undefined || this.html === null || this.html.trim() === '') {
                this.dynamicComponent = undefined;
                this.dynamicModule = undefined;
                return;
            }

            this.dynamicComponent = this.createNewComponent(this.html, this.context);
            this.dynamicModule = this.compiler.compileModuleSync(
                this.createComponentModule(this.dynamicComponent),
            );
        } catch (e) {
            if (this.errorHandler === undefined) {
                throw e;
            } else {
                this.errorHandler(e);
            }
        }
    }

    private createComponentModule(componentType: any) {
        let module: NgModule = {};

        if (this.module !== undefined) {
            module = Object.assign({}, this.module);
        }

        module.imports = module.imports || [];
        module.imports.push(CommonModule);
        if (this.imports !== undefined) {
            module.imports = module.imports.concat(this.imports);
        }
        if (module.declarations === undefined) {
            module.declarations = [componentType];
        } else {
            module.declarations.push(componentType);
        }

        @NgModule(module)
        class RuntimeComponentModule {}

        return RuntimeComponentModule;
    }

    private createNewComponent(html: string, context: any) {
        const selector: string = nextId();

        @Component({
            selector: selector,
            template: html,
            standalone: false,
        })
        class DynamicComponent {
            context: any = context;
        }

        return DynamicComponent;
    }
}
