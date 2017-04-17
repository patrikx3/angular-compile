import {
    Component, OnInit, Input, NgModule, NgModuleFactory, Compiler
} from '@angular/core';

@Component({
    selector: 'p3x-dynamic-component',
    template: `<ng-container *ngComponentOutlet="dynamicComponent;
                            ngModuleFactory: dynamicModule;"></ng-container>`,
})
export class DynamicComponent implements OnInit {
    dynamicComponent : any;
    dynamicModule: NgModuleFactory<any>;

    @Input()
    text: string;

    constructor(private compiler: Compiler) {
    }

    ngOnInit() {
        this.dynamicComponent = this.createNewComponent(this.text);
        this.dynamicModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicComponent));
    }

    protected createComponentModule (componentType: any) {
        @NgModule({
            imports: [],
            declarations: [
                componentType
            ],
            entryComponents: [componentType]
        })
        class RuntimeComponentModule
        {
        }
        // a module for just this Type
        return RuntimeComponentModule;
    }

    protected createNewComponent (text:string) {
        let template = `dynamically created template with text: ${text}`;

        @Component({
            selector: 'dynamic-component',
            template: template
        })
        class DynamicComponent implements OnInit{
            text: any;
            ngOnInit() {
                this.text = text;
            }
        }
        return DynamicComponent;
    }
}